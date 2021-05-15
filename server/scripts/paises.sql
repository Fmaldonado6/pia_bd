
if NOT EXISTS(select 1
from Pais)
BEGIN
    SET IDENTITY_INSERT Pais ON

    INSERT INTO Pais
        (idPais,nombre)
    VALUES
        (1, 'Mexico');

    SET IDENTITY_INSERT Pais OFF
END

if NOT EXISTS(select 1
from Estado)
BEGIN
    SET IDENTITY_INSERT Pais OFF
    SET IDENTITY_INSERT Estado ON

    INSERT INTO Estado
        (idEstado,nombre,idPais)
    VALUES
        (1, 'Aguascalientes', 1),
        (2, 'Baja California', 1),
        (3, 'Baja California Sur', 1),
        (4, 'Campeche', 1),
        (5, 'Coahuila de Zaragoza', 1),
        (6, 'Colima', 1),
        (7, 'Chiapas', 1),
        (8, 'Chihuahua', 1),
        (9, 'Distrito Federal', 1),
        (10, 'Durango', 1),
        (11, 'Guanajuato', 1),
        (12, 'Guerrero', 1),
        (13, 'Hidalgo', 1),
        (14, 'Jalisco', 1),
        (15, 'México', 1),
        (16, 'Michoacán de Ocampo', 1),
        (17, 'Morelos', 1),
        (18, 'Nayarit', 1),
        (19, 'Nuevo León', 1),
        (20, 'Oaxaca de Juárez', 1),
        (21, 'Puebla', 1),
        (22, 'Querétaro', 1),
        (23, 'Quintana Roo', 1),
        (24, 'San Luis Potosí', 1),
        (25, 'Sinaloa', 1),
        (26, 'Sonora', 1),
        (27, 'Tabasco', 1),
        (28, 'Tamaulipas', 1),
        (29, 'Tlaxcala', 1),
        (30, 'Veracruz de Ignacio de la Llave', 1),
        (31, 'Yucatán', 1),
        (32, 'Zacatecas', 1);

    SET IDENTITY_INSERT Estado OFF
END
