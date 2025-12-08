package com.inventario.service;

import com.inventario.model.dto.ProductoDTO;

import java.util.List;

public interface ProductoService {

    ProductoDTO crear(ProductoDTO productoDTO);

    ProductoDTO obtenerPorId(Long id);

    List<ProductoDTO> obtenerTodos();

    ProductoDTO actualizar(Long id, ProductoDTO productoDTO);

    void eliminar(Long id);

    ProductoDTO obtenerPorCodigo(String codigo);
}

