<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c"
           uri="jakarta.tags.core" %>

<html>
<head>
    <title>Clientes</title>
</head>
<body>

<h2>Lista de Clientes</h2>

<a href="clientes?action=nuevo">
    Nuevo Cliente
</a>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Total Compras</th>
        <th>Acciones</th>
    </tr>

    <c:forEach var="c" items="${clientes}">
        <tr>
            <td>${c.id}</td>
            <td>${c.nombre} ${c.apellido}</td>
            <td>${c.correo}</td>
            <td>${c.totalCompras}</td>
            <td>
                <a href="clientes?action=editar&id=${c.id}">
                    Editar
                </a>

                <a href="clientes?action=eliminar&id=${c.id}">
                    Eliminar
                </a>
            </td>
        </tr>
    </c:forEach>

</table>

</body>
</html>
