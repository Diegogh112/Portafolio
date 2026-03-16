package dao;

import java.util.List;

public interface GenericDAO<T, ID> {

    void crear(T t);

    T buscar(ID id);

    List<T> listar();

    void actualizar(T t);

    void eliminar(ID id);
}
