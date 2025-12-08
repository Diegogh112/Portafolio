package com.inventario.controller;

import com.inventario.model.dto.ProductoDTO;
import com.inventario.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "API para gestión de productos")
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping
    @Operation(summary = "Crear un nuevo producto")
    public ResponseEntity<ProductoDTO> crear(@Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = productoService.crear(productoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        ProductoDTO producto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(producto);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los productos")
    public ResponseEntity<List<ProductoDTO>> obtenerTodos() {
        List<ProductoDTO> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/codigo/{codigo}")
    @Operation(summary = "Obtener producto por código")
    public ResponseEntity<ProductoDTO> obtenerPorCodigo(@PathVariable String codigo) {
        ProductoDTO producto = productoService.obtenerPorCodigo(codigo);
        return ResponseEntity.ok(producto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id, 
                                                   @Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = productoService.actualizar(id, productoDTO);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

