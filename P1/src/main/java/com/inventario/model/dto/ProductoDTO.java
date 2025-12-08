package com.inventario.model.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {

    private Long id;

    @NotBlank(message = "El código es obligatorio")
    @Size(max = 50, message = "El código no puede exceder 50 caracteres")
    private String codigo;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    private String nombre;

    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;

    @NotBlank(message = "La unidad es obligatoria")
    @Size(max = 20, message = "La unidad no puede exceder 20 caracteres")
    private String unidad;

    @NotNull(message = "El costo unitario es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El costo unitario debe ser mayor a 0")
    @Digits(integer = 8, fraction = 2, message = "El costo unitario debe tener máximo 8 dígitos enteros y 2 decimales")
    private BigDecimal costoUnitario;

    @Size(max = 100, message = "La categoría no puede exceder 100 caracteres")
    private String categoria;
}

