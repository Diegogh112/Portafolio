package com.inventario.model.dto;

import com.inventario.model.entity.TipoMovimiento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KardexDTO {

    private Long id;
    private Long productoId;
    private String productoNombre;
    private LocalDateTime fecha;
    private TipoMovimiento tipo;
    private Integer cantidad;
    private BigDecimal costoUnitario;
    private BigDecimal total;
    private Integer saldoCantidad;
    private BigDecimal saldoCostoUnitario;
    private BigDecimal saldoTotal;
}

