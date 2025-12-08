package com.inventario.model.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlmacenDTO {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    private String nombre;

    @Size(max = 300, message = "La ubicación no puede exceder 300 caracteres")
    private String ubicacion;

    @Size(max = 200, message = "El responsable no puede exceder 200 caracteres")
    private String responsable;
}

