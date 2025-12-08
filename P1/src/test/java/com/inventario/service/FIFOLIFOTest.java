package com.inventario.service;

import com.inventario.config.InventarioConfig;
import com.inventario.model.entity.Kardex;
import com.inventario.service.impl.MovimientoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class FIFOLIFOTest {

    @Mock
    private InventarioConfig inventarioConfig;

    private MovimientoServiceImpl movimientoService;

    @BeforeEach
    void setUp() {
        movimientoService = new MovimientoServiceImpl(
                null, null, null, null, null, inventarioConfig
        );
    }

    @Test
    void testCalcularCostoSalidaFIFO() {
        // Arrange
        List<Kardex> entradas = new ArrayList<>();
        
        Kardex entrada1 = new Kardex();
        entrada1.setCantidad(10);
        entrada1.setCostoUnitario(new BigDecimal("100.00"));
        entrada1.setFecha(LocalDateTime.now().minusDays(2));
        entradas.add(entrada1);

        Kardex entrada2 = new Kardex();
        entrada2.setCantidad(5);
        entrada2.setCostoUnitario(new BigDecimal("120.00"));
        entrada2.setFecha(LocalDateTime.now().minusDays(1));
        entradas.add(entrada2);

        Integer cantidadSolicitada = 12;
        boolean fifo = true;

        // Act
        BigDecimal costoTotal = movimientoService.calcularCostoSalida(entradas, cantidadSolicitada, fifo);

        // Assert
        // 10 unidades a 100.00 + 2 unidades a 120.00 = 1000.00 + 240.00 = 1240.00
        assertEquals(new BigDecimal("1240.00"), costoTotal);
    }

    @Test
    void testCalcularCostoSalidaLIFO() {
        // Arrange
        List<Kardex> entradas = new ArrayList<>();
        
        Kardex entrada1 = new Kardex();
        entrada1.setCantidad(10);
        entrada1.setCostoUnitario(new BigDecimal("100.00"));
        entrada1.setFecha(LocalDateTime.now().minusDays(2));
        entradas.add(entrada1);

        Kardex entrada2 = new Kardex();
        entrada2.setCantidad(5);
        entrada2.setCostoUnitario(new BigDecimal("120.00"));
        entrada2.setFecha(LocalDateTime.now().minusDays(1));
        entradas.add(entrada2);

        Integer cantidadSolicitada = 12;
        boolean fifo = false; // LIFO

        // Act
        BigDecimal costoTotal = movimientoService.calcularCostoSalida(entradas, cantidadSolicitada, fifo);

        // Assert
        // 5 unidades a 120.00 + 7 unidades a 100.00 = 600.00 + 700.00 = 1300.00
        assertEquals(new BigDecimal("1300.00"), costoTotal);
    }
}
