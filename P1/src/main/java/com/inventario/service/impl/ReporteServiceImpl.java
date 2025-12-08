package com.inventario.service.impl;

import com.inventario.model.dto.StockAlmacenDTO;
import com.inventario.model.dto.StockDTO;
import com.inventario.model.entity.Kardex;
import com.inventario.repository.KardexRepository;
import com.inventario.repository.ProductoRepository;
import com.inventario.service.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReporteServiceImpl implements ReporteService {

    private final KardexRepository kardexRepository;
    private final ProductoRepository productoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<StockDTO> obtenerStockTotalPorProducto() {
        return productoRepository.findAll().stream()
                .map(producto -> {
                    Kardex ultimoKardex = kardexRepository.findLastByProductoId(producto.getId())
                            .orElse(null);
                    
                    if (ultimoKardex == null || ultimoKardex.getSaldoCantidad() == 0) {
                        return new StockDTO(
                                producto.getId(),
                                producto.getCodigo(),
                                producto.getNombre(),
                                0,
                                BigDecimal.ZERO,
                                BigDecimal.ZERO
                        );
                    }
                    
                    return new StockDTO(
                            producto.getId(),
                            producto.getCodigo(),
                            producto.getNombre(),
                            ultimoKardex.getSaldoCantidad(),
                            ultimoKardex.getSaldoCostoUnitario(),
                            ultimoKardex.getSaldoTotal()
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StockAlmacenDTO> obtenerStockPorAlmacen() {
        // Nota: Esta implementación simplificada asume que el kardex no está separado por almacén
        // En una implementación real, necesitarías agregar almacenId al Kardex o usar una consulta diferente
        return obtenerStockTotalPorProducto().stream()
                .flatMap(stock -> {
                    // Por simplicidad, retornamos el stock total para todos los almacenes
                    // En producción, deberías tener una relación almacen-producto en kardex
                    return List.of(new StockAlmacenDTO(
                            stock.getProductoId(),
                            stock.getProductoCodigo(),
                            stock.getProductoNombre(),
                            null,
                            "Todos",
                            stock.getCantidadTotal(),
                            stock.getCostoUnitarioPromedio(),
                            stock.getValorTotal()
                    )).stream();
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StockAlmacenDTO> obtenerStockPorAlmacen(Long almacenId) {
        // Similar a la implementación anterior, pero filtrado por almacén
        // En producción, necesitarías modificar la entidad Kardex para incluir almacenId
        return obtenerStockPorAlmacen().stream()
                .filter(stock -> stock.getAlmacenId() == null || stock.getAlmacenId().equals(almacenId))
                .collect(Collectors.toList());
    }
}

