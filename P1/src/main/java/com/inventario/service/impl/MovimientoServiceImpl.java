package com.inventario.service.impl;

import com.inventario.config.InventarioConfig;
import com.inventario.exception.RecursoNoEncontradoException;
import com.inventario.exception.StockInsuficienteException;
import com.inventario.mapper.MovimientoMapper;
import com.inventario.model.dto.MovimientoDTO;
import com.inventario.model.dto.MovimientoFiltroDTO;
import com.inventario.model.entity.*;
import com.inventario.repository.AlmacenRepository;
import com.inventario.repository.KardexRepository;
import com.inventario.repository.MovimientoRepository;
import com.inventario.repository.ProductoRepository;
import com.inventario.service.MovimientoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoServiceImpl implements MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final ProductoRepository productoRepository;
    private final AlmacenRepository almacenRepository;
    private final KardexRepository kardexRepository;
    private final MovimientoMapper movimientoMapper;
    private final InventarioConfig inventarioConfig;

    @Override
    @Transactional
    public MovimientoDTO registrarMovimiento(MovimientoDTO movimientoDTO) {
        // Validar que el producto y almacén existan
        Producto producto = productoRepository.findById(movimientoDTO.getProductoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado con id: " + movimientoDTO.getProductoId()));
        
        Almacen almacen = almacenRepository.findById(movimientoDTO.getAlmacenId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Almacén no encontrado con id: " + movimientoDTO.getAlmacenId()));

        // Crear el movimiento
        Movimiento movimiento = new Movimiento();
        movimiento.setTipo(movimientoDTO.getTipo());
        movimiento.setCantidad(movimientoDTO.getCantidad());
        movimiento.setFecha(movimientoDTO.getFecha() != null ? movimientoDTO.getFecha() : LocalDateTime.now());
        movimiento.setProducto(producto);
        movimiento.setAlmacen(almacen);
        movimiento.setCostoUnitarioMov(movimientoDTO.getCostoUnitarioMov());
        movimiento.setTotalMov(movimientoDTO.getCostoUnitarioMov()
                .multiply(BigDecimal.valueOf(movimientoDTO.getCantidad()))
                .setScale(2, RoundingMode.HALF_UP));

        // Procesar según el tipo de movimiento
        if (movimiento.getTipo() == TipoMovimiento.ENTRADA) {
            procesarEntrada(movimiento);
        } else {
            procesarSalida(movimiento);
        }

        // Guardar el movimiento
        movimiento = movimientoRepository.save(movimiento);
        return movimientoMapper.toDTO(movimiento);
    }

    private void procesarEntrada(Movimiento movimiento) {
        // Obtener el último kardex para calcular saldos
        Kardex ultimoKardex = kardexRepository.findLastByProductoId(movimiento.getProducto().getId())
                .orElse(null);

        // Calcular nuevos saldos
        Integer nuevaCantidad = (ultimoKardex != null ? ultimoKardex.getSaldoCantidad() : 0) + movimiento.getCantidad();
        BigDecimal nuevoTotal = (ultimoKardex != null ? ultimoKardex.getSaldoTotal() : BigDecimal.ZERO)
                .add(movimiento.getTotalMov());
        BigDecimal nuevoCostoUnitario = nuevoTotal.divide(BigDecimal.valueOf(nuevaCantidad), 2, RoundingMode.HALF_UP);

        // Crear registro de kardex
        Kardex kardex = new Kardex();
        kardex.setProducto(movimiento.getProducto());
        kardex.setFecha(movimiento.getFecha());
        kardex.setTipo(movimiento.getTipo());
        kardex.setCantidad(movimiento.getCantidad());
        kardex.setCostoUnitario(movimiento.getCostoUnitarioMov());
        kardex.setTotal(movimiento.getTotalMov());
        kardex.setSaldoCantidad(nuevaCantidad);
        kardex.setSaldoCostoUnitario(nuevoCostoUnitario);
        kardex.setSaldoTotal(nuevoTotal);

        kardexRepository.save(kardex);
    }

    private void procesarSalida(Movimiento movimiento) {
        // Validar stock disponible
        Kardex ultimoKardex = kardexRepository.findLastByProductoId(movimiento.getProducto().getId())
                .orElse(null);

        Integer stockDisponible = ultimoKardex != null ? ultimoKardex.getSaldoCantidad() : 0;
        if (stockDisponible < movimiento.getCantidad()) {
            throw new StockInsuficienteException(
                    String.format("Stock insuficiente. Disponible: %d, Solicitado: %d", 
                            stockDisponible, movimiento.getCantidad()));
        }

        // Obtener todos los registros de kardex según el método configurado
        List<Kardex> todosKardex;
        if (inventarioConfig.getMetodo() == InventarioConfig.MetodoInventario.FIFO) {
            todosKardex = kardexRepository.findByProductoIdOrderByFechaAscForFIFO(movimiento.getProducto().getId());
        } else {
            todosKardex = kardexRepository.findByProductoIdOrderByFechaDescForLIFO(movimiento.getProducto().getId());
        }

        // Filtrar solo entradas y mantener el orden
        List<Kardex> entradas = todosKardex.stream()
                .filter(k -> k.getTipo() == TipoMovimiento.ENTRADA)
                .toList();

        // Calcular costo según FIFO/LIFO
        BigDecimal costoTotal = calcularCostoSalida(entradas, movimiento.getCantidad(), 
                inventarioConfig.getMetodo() == InventarioConfig.MetodoInventario.FIFO);
        
        BigDecimal costoUnitarioSalida = costoTotal.divide(
                BigDecimal.valueOf(movimiento.getCantidad()), 2, RoundingMode.HALF_UP);

        // Actualizar movimiento con el costo calculado
        movimiento.setCostoUnitarioMov(costoUnitarioSalida);
        movimiento.setTotalMov(costoTotal);

        // Calcular nuevos saldos
        Integer nuevaCantidad = stockDisponible - movimiento.getCantidad();
        BigDecimal saldoTotalAnterior = ultimoKardex != null ? ultimoKardex.getSaldoTotal() : BigDecimal.ZERO;
        BigDecimal nuevoTotal = saldoTotalAnterior.subtract(costoTotal);
        BigDecimal nuevoCostoUnitario = nuevaCantidad > 0 
                ? nuevoTotal.divide(BigDecimal.valueOf(nuevaCantidad), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        // Crear registro de kardex
        Kardex kardex = new Kardex();
        kardex.setProducto(movimiento.getProducto());
        kardex.setFecha(movimiento.getFecha());
        kardex.setTipo(movimiento.getTipo());
        kardex.setCantidad(movimiento.getCantidad());
        kardex.setCostoUnitario(costoUnitarioSalida);
        kardex.setTotal(costoTotal);
        kardex.setSaldoCantidad(nuevaCantidad);
        kardex.setSaldoCostoUnitario(nuevoCostoUnitario);
        kardex.setSaldoTotal(nuevoTotal);

        kardexRepository.save(kardex);
    }

    public BigDecimal calcularCostoSalida(List<Kardex> entradas, Integer cantidadSolicitada, boolean fifo) {
        BigDecimal costoTotal = BigDecimal.ZERO;
        Integer cantidadRestante = cantidadSolicitada;

        if (fifo) {
            // FIFO: tomar desde las más antiguas
            for (Kardex entrada : entradas) {
                if (cantidadRestante <= 0) break;
                
                Integer cantidadATomar = Math.min(cantidadRestante, entrada.getCantidad());
                BigDecimal costoParcial = entrada.getCostoUnitario()
                        .multiply(BigDecimal.valueOf(cantidadATomar));
                costoTotal = costoTotal.add(costoParcial);
                cantidadRestante -= cantidadATomar;
            }
        } else {
            // LIFO: tomar desde las más recientes
            for (int i = entradas.size() - 1; i >= 0; i--) {
                if (cantidadRestante <= 0) break;
                
                Kardex entrada = entradas.get(i);
                Integer cantidadATomar = Math.min(cantidadRestante, entrada.getCantidad());
                BigDecimal costoParcial = entrada.getCostoUnitario()
                        .multiply(BigDecimal.valueOf(cantidadATomar));
                costoTotal = costoTotal.add(costoParcial);
                cantidadRestante -= cantidadATomar;
            }
        }

        if (cantidadRestante > 0) {
            throw new StockInsuficienteException("No hay suficientes entradas para cubrir la salida");
        }

        return costoTotal.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    @Transactional(readOnly = true)
    public MovimientoDTO obtenerPorId(Long id) {
        Movimiento movimiento = movimientoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Movimiento no encontrado con id: " + id));
        return movimientoMapper.toDTO(movimiento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoDTO> obtenerTodos() {
        List<Movimiento> movimientos = movimientoRepository.findAll();
        return movimientoMapper.toDTOList(movimientos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoDTO> buscarConFiltros(MovimientoFiltroDTO filtro) {
        List<Movimiento> movimientos = movimientoRepository.findWithFilters(
                filtro.getFechaDesde(),
                filtro.getFechaHasta(),
                filtro.getProductoId(),
                filtro.getAlmacenId(),
                filtro.getTipo()
        );
        return movimientoMapper.toDTOList(movimientos);
    }
}

