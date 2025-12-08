package com.inventario.mapper;

import com.inventario.model.dto.KardexDTO;
import com.inventario.model.entity.Kardex;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KardexMapper {

    @Mapping(target = "productoId", source = "producto.id")
    @Mapping(target = "productoNombre", source = "producto.nombre")
    KardexDTO toDTO(Kardex kardex);

    List<KardexDTO> toDTOList(List<Kardex> kardexList);
}

