package com.inventario.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockDTO {

    private Long productoId;
    private String productoCodigo;
    private String productoNombre;
    private Integer cantidadTotal;
    private BigDecimal costoUnitarioPromedio;
    private BigDecimal valorTotal;
}

