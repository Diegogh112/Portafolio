package com.inventario.mapper;

import com.inventario.model.dto.MovimientoDTO;
import com.inventario.model.entity.Movimiento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MovimientoMapper {

    @Mapping(target = "productoId", source = "producto.id")
    @Mapping(target = "almacenId", source = "almacen.id")
    @Mapping(target = "productoNombre", source = "producto.nombre")
    @Mapping(target = "almacenNombre", source = "almacen.nombre")
    MovimientoDTO toDTO(Movimiento movimiento);

    @Mapping(target = "producto", ignore = true)
    @Mapping(target = "almacen", ignore = true)
    Movimiento toEntity(MovimientoDTO movimientoDTO);

    List<MovimientoDTO> toDTOList(List<Movimiento> movimientos);
}

