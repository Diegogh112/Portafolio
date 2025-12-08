-- Datos de prueba para Productos
INSERT INTO productos (id, codigo, nombre, descripcion, unidad, costo_unitario, categoria) VALUES
(1, 'PROD001', 'Laptop Dell', 'Laptop Dell Inspiron 15', 'UNIDAD', 850.00, 'TECNOLOGIA'),
(2, 'PROD002', 'Mouse Logitech', 'Mouse inalámbrico Logitech', 'UNIDAD', 25.50, 'TECNOLOGIA'),
(3, 'PROD003', 'Teclado Mecánico', 'Teclado mecánico RGB', 'UNIDAD', 120.00, 'TECNOLOGIA'),
(4, 'PROD004', 'Monitor Samsung', 'Monitor 24 pulgadas Full HD', 'UNIDAD', 200.00, 'TECNOLOGIA'),
(5, 'PROD005', 'Cable HDMI', 'Cable HDMI 2 metros', 'UNIDAD', 15.00, 'ACCESORIOS');

-- Datos de prueba para Almacenes
INSERT INTO almacenes (id, nombre, ubicacion, responsable) VALUES
(1, 'Almacén Central', 'Edificio A, Piso 1', 'Juan Pérez'),
(2, 'Almacén Norte', 'Sucursal Norte, Bodega 2', 'María González'),
(3, 'Almacén Sur', 'Sucursal Sur, Bodega 1', 'Carlos Rodríguez');

-- Nota: Los movimientos y kardex se generan automáticamente al usar la API
-- Los datos de prueba de productos y almacenes están listos para usar

