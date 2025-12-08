package com.inventario.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockAlmacenDTO {

    private Long productoId;
    private String productoCodigo;
    private String productoNombre;
    private Long almacenId;
    private String almacenNombre;
    private Integer cantidad;
    private BigDecimal costoUnitarioPromedio;
    private BigDecimal valorTotal;
}

