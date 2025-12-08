package com.inventario.service.impl;

import com.inventario.exception.RecursoDuplicadoException;
import com.inventario.exception.RecursoNoEncontradoException;
import com.inventario.mapper.ProductoMapper;
import com.inventario.model.dto.ProductoDTO;
import com.inventario.model.entity.Producto;
import com.inventario.repository.ProductoRepository;
import com.inventario.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;

    @Override
    @Transactional
    public ProductoDTO crear(ProductoDTO productoDTO) {
        if (productoRepository.existsByCodigo(productoDTO.getCodigo())) {
            throw new RecursoDuplicadoException("Ya existe un producto con el código: " + productoDTO.getCodigo());
        }
        Producto producto = productoMapper.toEntity(productoDTO);
        producto = productoRepository.save(producto);
        return productoMapper.toDTO(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDTO obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado con id: " + id));
        return productoMapper.toDTO(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> obtenerTodos() {
        List<Producto> productos = productoRepository.findAll();
        return productoMapper.toDTOList(productos);
    }

    @Override
    @Transactional
    public ProductoDTO actualizar(Long id, ProductoDTO productoDTO) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado con id: " + id));
        
        if (!producto.getCodigo().equals(productoDTO.getCodigo()) && 
            productoRepository.existsByCodigo(productoDTO.getCodigo())) {
            throw new RecursoDuplicadoException("Ya existe un producto con el código: " + productoDTO.getCodigo());
        }
        
        productoMapper.updateEntityFromDTO(productoDTO, producto);
        producto = productoRepository.save(producto);
        return productoMapper.toDTO(producto);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Producto no encontrado con id: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDTO obtenerPorCodigo(String codigo) {
        Producto producto = productoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado con código: " + codigo));
        return productoMapper.toDTO(producto);
    }
}

