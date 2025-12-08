package com.inventario.controller;

import com.inventario.model.dto.MovimientoDTO;
import com.inventario.model.dto.MovimientoFiltroDTO;
import com.inventario.service.MovimientoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
@Tag(name = "Movimientos", description = "API para gestión de movimientos de inventario")
public class MovimientoController {

    private final MovimientoService movimientoService;

    @PostMapping
    @Operation(summary = "Registrar un nuevo movimiento")
    public ResponseEntity<MovimientoDTO> registrarMovimiento(@Valid @RequestBody MovimientoDTO movimientoDTO) {
        MovimientoDTO movimiento = movimientoService.registrarMovimiento(movimientoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(movimiento);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener movimiento por ID")
    public ResponseEntity<MovimientoDTO> obtenerPorId(@PathVariable Long id) {
        MovimientoDTO movimiento = movimientoService.obtenerPorId(id);
        return ResponseEntity.ok(movimiento);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los movimientos")
    public ResponseEntity<List<MovimientoDTO>> obtenerTodos() {
        List<MovimientoDTO> movimientos = movimientoService.obtenerTodos();
        return ResponseEntity.ok(movimientos);
    }

    @PostMapping("/buscar")
    @Operation(summary = "Buscar movimientos con filtros")
    public ResponseEntity<List<MovimientoDTO>> buscarConFiltros(@RequestBody MovimientoFiltroDTO filtro) {
        List<MovimientoDTO> movimientos = movimientoService.buscarConFiltros(filtro);
        return ResponseEntity.ok(movimientos);
    }
}

