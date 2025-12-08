package com.inventario.model.dto;

import com.inventario.model.entity.TipoMovimiento;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoDTO {

    private Long id;

    @NotNull(message = "El tipo de movimiento es obligatorio")
    private TipoMovimiento tipo;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;

    private LocalDateTime fecha;

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotNull(message = "El almacén es obligatorio")
    private Long almacenId;

    @NotNull(message = "El costo unitario es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El costo unitario debe ser mayor a 0")
    @Digits(integer = 8, fraction = 2, message = "El costo unitario debe tener máximo 8 dígitos enteros y 2 decimales")
    private BigDecimal costoUnitarioMov;

    private BigDecimal totalMov;

    // Campos adicionales para respuesta
    private String productoNombre;
    private String almacenNombre;
}

