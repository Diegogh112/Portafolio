package com.inventario.repository;

import com.inventario.model.entity.Kardex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KardexRepository extends JpaRepository<Kardex, Long> {

    List<Kardex> findByProductoIdOrderByFechaAsc(Long productoId);

    List<Kardex> findByProductoIdOrderByFechaDesc(Long productoId);

    @Query("SELECT k FROM Kardex k WHERE k.producto.id = :productoId ORDER BY k.fecha DESC")
    Optional<Kardex> findLastByProductoId(@Param("productoId") Long productoId);


    @Query("SELECT k FROM Kardex k WHERE k.producto.id = :productoId ORDER BY k.fecha ASC")
    List<Kardex> findByProductoIdOrderByFechaAscForFIFO(@Param("productoId") Long productoId);

    @Query("SELECT k FROM Kardex k WHERE k.producto.id = :productoId ORDER BY k.fecha DESC")
    List<Kardex> findByProductoIdOrderByFechaDescForLIFO(@Param("productoId") Long productoId);
}

