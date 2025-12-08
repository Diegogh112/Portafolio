package com.inventario.service;

import com.inventario.model.dto.MovimientoDTO;
import com.inventario.model.dto.MovimientoFiltroDTO;

import java.util.List;

public interface MovimientoService {

    MovimientoDTO registrarMovimiento(MovimientoDTO movimientoDTO);

    MovimientoDTO obtenerPorId(Long id);

    List<MovimientoDTO> obtenerTodos();

    List<MovimientoDTO> buscarConFiltros(MovimientoFiltroDTO filtro);
}

