package com.inventario.controller;

import com.inventario.model.dto.AlmacenDTO;
import com.inventario.service.AlmacenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almacenes")
@RequiredArgsConstructor
@Tag(name = "Almacenes", description = "API para gestión de almacenes")
public class AlmacenController {

    private final AlmacenService almacenService;

    @PostMapping
    @Operation(summary = "Crear un nuevo almacén")
    public ResponseEntity<AlmacenDTO> crear(@Valid @RequestBody AlmacenDTO almacenDTO) {
        AlmacenDTO almacen = almacenService.crear(almacenDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(almacen);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener almacén por ID")
    public ResponseEntity<AlmacenDTO> obtenerPorId(@PathVariable Long id) {
        AlmacenDTO almacen = almacenService.obtenerPorId(id);
        return ResponseEntity.ok(almacen);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los almacenes")
    public ResponseEntity<List<AlmacenDTO>> obtenerTodos() {
        List<AlmacenDTO> almacenes = almacenService.obtenerTodos();
        return ResponseEntity.ok(almacenes);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un almacén")
    public ResponseEntity<AlmacenDTO> actualizar(@PathVariable Long id, 
                                                   @Valid @RequestBody AlmacenDTO almacenDTO) {
        AlmacenDTO almacen = almacenService.actualizar(id, almacenDTO);
        return ResponseEntity.ok(almacen);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un almacén")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        almacenService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

