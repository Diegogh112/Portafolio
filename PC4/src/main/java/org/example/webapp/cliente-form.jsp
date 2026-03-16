<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
    <title>Cliente</title>
</head>
<body>

<h2>Formulario Cliente</h2>

<form action="clientes" method="post">

    <input type="hidden"
           name="id"
           value="${cliente.id}"/>

    Nombre:
    <input type="text" name="nombre"
           value="${cliente.nombre}" required/><br>

    Apellido:
    <input type="text" name="apellido"
           value="${cliente.apellido}" required/><br>

    Correo:
    <input type="email" name="correo"
           value="${cliente.correo}" required/><br>

    Teléfono:
    <input type="text" name="telefono"
           value="${cliente.telefono}" required/><br>

    Total Compras:
    <input type="number" step="0.01"
           name="totalCompras"
           value="${cliente.totalCompras}" required/><br>

    <button type="submit">
        Guardar
    </button>

</form>

</body>
</html>
