package com.inventario.model.dto;

import com.inventario.model.entity.TipoMovimiento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoFiltroDTO {

    private LocalDateTime fechaDesde;
    private LocalDateTime fechaHasta;
    private Long productoId;
    private Long almacenId;
    private TipoMovimiento tipo;
}

