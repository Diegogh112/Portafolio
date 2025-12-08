package com.inventario.repository;

import com.inventario.model.entity.Movimiento;
import com.inventario.model.entity.TipoMovimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    List<Movimiento> findByProductoId(Long productoId);

    List<Movimiento> findByAlmacenId(Long almacenId);

    List<Movimiento> findByTipo(TipoMovimiento tipo);

    @Query("SELECT m FROM Movimiento m WHERE " +
           "(:fechaDesde IS NULL OR m.fecha >= :fechaDesde) AND " +
           "(:fechaHasta IS NULL OR m.fecha <= :fechaHasta) AND " +
           "(:productoId IS NULL OR m.producto.id = :productoId) AND " +
           "(:almacenId IS NULL OR m.almacen.id = :almacenId) AND " +
           "(:tipo IS NULL OR m.tipo = :tipo)")
    List<Movimiento> findWithFilters(
            @Param("fechaDesde") LocalDateTime fechaDesde,
            @Param("fechaHasta") LocalDateTime fechaHasta,
            @Param("productoId") Long productoId,
            @Param("almacenId") Long almacenId,
            @Param("tipo") TipoMovimiento tipo
    );
}

