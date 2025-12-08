package com.inventario.mapper;

import com.inventario.model.dto.ProductoDTO;
import com.inventario.model.entity.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    ProductoDTO toDTO(Producto producto);

    Producto toEntity(ProductoDTO productoDTO);

    List<ProductoDTO> toDTOList(List<Producto> productos);

    void updateEntityFromDTO(ProductoDTO productoDTO, @MappingTarget Producto producto);
}

