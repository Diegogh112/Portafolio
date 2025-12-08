package com.inventario.service.impl;

import com.inventario.exception.RecursoNoEncontradoException;
import com.inventario.mapper.AlmacenMapper;
import com.inventario.model.dto.AlmacenDTO;
import com.inventario.model.entity.Almacen;
import com.inventario.repository.AlmacenRepository;
import com.inventario.service.AlmacenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlmacenServiceImpl implements AlmacenService {

    private final AlmacenRepository almacenRepository;
    private final AlmacenMapper almacenMapper;

    @Override
    @Transactional
    public AlmacenDTO crear(AlmacenDTO almacenDTO) {
        Almacen almacen = almacenMapper.toEntity(almacenDTO);
        almacen = almacenRepository.save(almacen);
        return almacenMapper.toDTO(almacen);
    }

    @Override
    @Transactional(readOnly = true)
    public AlmacenDTO obtenerPorId(Long id) {
        Almacen almacen = almacenRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Almacén no encontrado con id: " + id));
        return almacenMapper.toDTO(almacen);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlmacenDTO> obtenerTodos() {
        List<Almacen> almacenes = almacenRepository.findAll();
        return almacenMapper.toDTOList(almacenes);
    }

    @Override
    @Transactional
    public AlmacenDTO actualizar(Long id, AlmacenDTO almacenDTO) {
        Almacen almacen = almacenRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Almacén no encontrado con id: " + id));
        almacenMapper.updateEntityFromDTO(almacenDTO, almacen);
        almacen = almacenRepository.save(almacen);
        return almacenMapper.toDTO(almacen);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        if (!almacenRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Almacén no encontrado con id: " + id);
        }
        almacenRepository.deleteById(id);
    }
}

