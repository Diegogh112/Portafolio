package com.inventario.service;

import com.inventario.model.dto.StockAlmacenDTO;
import com.inventario.model.dto.StockDTO;

import java.util.List;

public interface ReporteService {

    List<StockDTO> obtenerStockTotalPorProducto();

    List<StockAlmacenDTO> obtenerStockPorAlmacen();

    List<StockAlmacenDTO> obtenerStockPorAlmacen(Long almacenId);
}

