if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 1) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (1, 'Administrador');

    insert into
EmpPrivilegios
        (idTipoEmpleado,idPrivilegio)
    values
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5);

    SET IDENTITY_INSERT TipoEmpleado OFF
END



if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 0) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (0, 'Empleado');


    SET IDENTITY_INSERT TipoEmpleado OFF
END


if not exists(select *
from Empleado
where idEmpleado = 1000) 
BEGIN
    SET IDENTITY_INSERT Empleado ON

    insert into
Empleado
        (idEmpleado,nombre,contrasena,idTipoEmpleado)
    values
        (1000, 'Administrador', '123', 1);


    SET IDENTITY_INSERT Empleado OFF
END

if not exists(select *
from Colonia
where nombre = 'Col. del Valle') 
BEGIN
    SET IDENTITY_INSERT Colonia ON

    insert into
Colonia
        (idColonia,idMunicipio,nombre)
    values
        (1, 970, 'Col. del Valle');


    SET IDENTITY_INSERT Colonia OFF
END


if not exists(select *
from Calle
where nombre = 'Río Sena') 
BEGIN
    SET IDENTITY_INSERT Calle ON

    insert into
Calle
        (idColonia,idCalle,nombre)
    values
        (1, 1, 'Río Sena');


    SET IDENTITY_INSERT Calle OFF
END

if not exists(select *
from InfoNegocio
where idNegocio = 1) 
BEGIN
    SET IDENTITY_INSERT InfoNegocio ON

    insert into
InfoNegocio
        (idNegocio,nombre,horarioApertura,horarioCierre,idPais,idEstado,idMunicipio,idColonia,idCalle,numero,telefono)
    values
        (1, 'Bar Delow', '7:00 PM', '3:00 AM', 1, 19, 970, 1, 1, 23,8123434027);


    SET IDENTITY_INSERT InfoNegocio OFF
END