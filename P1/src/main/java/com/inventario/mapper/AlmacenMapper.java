package com.inventario.mapper;

import com.inventario.model.dto.AlmacenDTO;
import com.inventario.model.entity.Almacen;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlmacenMapper {

    AlmacenDTO toDTO(Almacen almacen);

    Almacen toEntity(AlmacenDTO almacenDTO);

    List<AlmacenDTO> toDTOList(List<Almacen> almacenes);

    void updateEntityFromDTO(AlmacenDTO almacenDTO, @MappingTarget Almacen almacen);
}

