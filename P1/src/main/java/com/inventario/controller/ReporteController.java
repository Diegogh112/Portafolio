package com.inventario.controller;

import com.inventario.model.dto.StockAlmacenDTO;
import com.inventario.model.dto.StockDTO;
import com.inventario.service.ReporteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@Tag(name = "Reportes", description = "API para reportes de inventario")
public class ReporteController {

    private final ReporteService reporteService;

    @GetMapping("/stock")
    @Operation(summary = "Obtener stock total por producto")
    public ResponseEntity<List<StockDTO>> obtenerStockTotalPorProducto() {
        List<StockDTO> stock = reporteService.obtenerStockTotalPorProducto();
        return ResponseEntity.ok(stock);
    }

    @GetMapping("/stock/almacenes")
    @Operation(summary = "Obtener stock por almacén")
    public ResponseEntity<List<StockAlmacenDTO>> obtenerStockPorAlmacen() {
        List<StockAlmacenDTO> stock = reporteService.obtenerStockPorAlmacen();
        return ResponseEntity.ok(stock);
    }

    @GetMapping("/stock/almacenes/{almacenId}")
    @Operation(summary = "Obtener stock por almacén específico")
    public ResponseEntity<List<StockAlmacenDTO>> obtenerStockPorAlmacen(@PathVariable Long almacenId) {
        List<StockAlmacenDTO> stock = reporteService.obtenerStockPorAlmacen(almacenId);
        return ResponseEntity.ok(stock);
    }
}

