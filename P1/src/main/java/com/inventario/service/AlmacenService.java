package com.inventario.service;

import com.inventario.model.dto.AlmacenDTO;

import java.util.List;

public interface AlmacenService {

    AlmacenDTO crear(AlmacenDTO almacenDTO);

    AlmacenDTO obtenerPorId(Long id);

    List<AlmacenDTO> obtenerTodos();

    AlmacenDTO actualizar(Long id, AlmacenDTO almacenDTO);

    void eliminar(Long id);
}

