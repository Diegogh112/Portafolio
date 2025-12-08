package com.inventario.service;

import com.inventario.config.InventarioConfig;
import com.inventario.exception.StockInsuficienteException;
import com.inventario.model.dto.MovimientoDTO;
import com.inventario.model.entity.*;
import com.inventario.repository.*;
import com.inventario.service.impl.MovimientoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MovimientoServiceTest {

    @Mock
    private MovimientoRepository movimientoRepository;

    @Mock
    private ProductoRepository productoRepository;

    @Mock
    private AlmacenRepository almacenRepository;

    @Mock
    private KardexRepository kardexRepository;

    @Mock
    private InventarioConfig inventarioConfig;

    @InjectMocks
    private MovimientoServiceImpl movimientoService;

    private Producto producto;
    private Almacen almacen;

    @BeforeEach
    void setUp() {
        producto = new Producto();
        producto.setId(1L);
        producto.setCodigo("PROD001");
        producto.setNombre("Producto Test");
        producto.setCostoUnitario(new BigDecimal("100.00"));

        almacen = new Almacen();
        almacen.setId(1L);
        almacen.setNombre("Almacén Test");
    }

    @Test
    void testRegistrarEntrada() {
        // Arrange
        MovimientoDTO movimientoDTO = new MovimientoDTO();
        movimientoDTO.setTipo(TipoMovimiento.ENTRADA);
        movimientoDTO.setCantidad(10);
        movimientoDTO.setProductoId(1L);
        movimientoDTO.setAlmacenId(1L);
        movimientoDTO.setCostoUnitarioMov(new BigDecimal("100.00"));

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(almacenRepository.findById(1L)).thenReturn(Optional.of(almacen));
        when(kardexRepository.findLastByProductoId(1L)).thenReturn(Optional.empty());
        when(movimientoRepository.save(any(Movimiento.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        MovimientoDTO result = movimientoService.registrarMovimiento(movimientoDTO);

        // Assert
        assertNotNull(result);
        verify(movimientoRepository, times(1)).save(any(Movimiento.class));
        verify(kardexRepository, times(1)).save(any(Kardex.class));
    }

    @Test
    void testRegistrarSalidaFIFO_StockSuficiente() {
        // Arrange
        InventarioConfig.MetodoInventario metodo = InventarioConfig.MetodoInventario.FIFO;
        when(inventarioConfig.getMetodo()).thenReturn(metodo);

        MovimientoDTO movimientoDTO = new MovimientoDTO();
        movimientoDTO.setTipo(TipoMovimiento.SALIDA);
        movimientoDTO.setCantidad(5);
        movimientoDTO.setProductoId(1L);
        movimientoDTO.setAlmacenId(1L);
        movimientoDTO.setCostoUnitarioMov(new BigDecimal("100.00"));

        Kardex ultimoKardex = new Kardex();
        ultimoKardex.setSaldoCantidad(10);
        ultimoKardex.setSaldoTotal(new BigDecimal("1000.00"));

        Kardex entrada1 = new Kardex();
        entrada1.setTipo(TipoMovimiento.ENTRADA);
        entrada1.setCantidad(10);
        entrada1.setCostoUnitario(new BigDecimal("100.00"));
        entrada1.setFecha(LocalDateTime.now().minusDays(2));

        List<Kardex> entradas = new ArrayList<>();
        entradas.add(entrada1);

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(almacenRepository.findById(1L)).thenReturn(Optional.of(almacen));
        when(kardexRepository.findLastByProductoId(1L)).thenReturn(Optional.of(ultimoKardex));
        when(kardexRepository.findByProductoIdOrderByFechaAscForFIFO(1L)).thenReturn(entradas);
        when(movimientoRepository.save(any(Movimiento.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        MovimientoDTO result = movimientoService.registrarMovimiento(movimientoDTO);

        // Assert
        assertNotNull(result);
        verify(movimientoRepository, times(1)).save(any(Movimiento.class));
        verify(kardexRepository, times(1)).save(any(Kardex.class));
    }

    @Test
    void testRegistrarSalida_StockInsuficiente() {
        // Arrange
        MovimientoDTO movimientoDTO = new MovimientoDTO();
        movimientoDTO.setTipo(TipoMovimiento.SALIDA);
        movimientoDTO.setCantidad(15);
        movimientoDTO.setProductoId(1L);
        movimientoDTO.setAlmacenId(1L);
        movimientoDTO.setCostoUnitarioMov(new BigDecimal("100.00"));

        Kardex ultimoKardex = new Kardex();
        ultimoKardex.setSaldoCantidad(10);
        ultimoKardex.setSaldoTotal(new BigDecimal("1000.00"));

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(almacenRepository.findById(1L)).thenReturn(Optional.of(almacen));
        when(kardexRepository.findLastByProductoId(1L)).thenReturn(Optional.of(ultimoKardex));

        // Act & Assert
        assertThrows(StockInsuficienteException.class, () -> {
            movimientoService.registrarMovimiento(movimientoDTO);
        });
    }

    @Test
    void testRegistrarSalidaLIFO_StockSuficiente() {
        // Arrange
        InventarioConfig.MetodoInventario metodo = InventarioConfig.MetodoInventario.LIFO;
        when(inventarioConfig.getMetodo()).thenReturn(metodo);

        MovimientoDTO movimientoDTO = new MovimientoDTO();
        movimientoDTO.setTipo(TipoMovimiento.SALIDA);
        movimientoDTO.setCantidad(5);
        movimientoDTO.setProductoId(1L);
        movimientoDTO.setAlmacenId(1L);
        movimientoDTO.setCostoUnitarioMov(new BigDecimal("100.00"));

        Kardex ultimoKardex = new Kardex();
        ultimoKardex.setSaldoCantidad(10);
        ultimoKardex.setSaldoTotal(new BigDecimal("1000.00"));

        Kardex entrada1 = new Kardex();
        entrada1.setTipo(TipoMovimiento.ENTRADA);
        entrada1.setCantidad(10);
        entrada1.setCostoUnitario(new BigDecimal("100.00"));
        entrada1.setFecha(LocalDateTime.now().minusDays(1));

        List<Kardex> entradas = new ArrayList<>();
        entradas.add(entrada1);

        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        when(almacenRepository.findById(1L)).thenReturn(Optional.of(almacen));
        when(kardexRepository.findLastByProductoId(1L)).thenReturn(Optional.of(ultimoKardex));
        when(kardexRepository.findByProductoIdOrderByFechaDescForLIFO(1L)).thenReturn(entradas);
        when(movimientoRepository.save(any(Movimiento.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        MovimientoDTO result = movimientoService.registrarMovimiento(movimientoDTO);

        // Assert
        assertNotNull(result);
        verify(movimientoRepository, times(1)).save(any(Movimiento.class));
        verify(kardexRepository, times(1)).save(any(Kardex.class));
    }
}

