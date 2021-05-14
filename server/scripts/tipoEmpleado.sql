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
        (1, 5),
        (1, 6),
        (1, 7);

    SET IDENTITY_INSERT TipoEmpleado OFF
END

if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 2) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (2, 'Mesero');

    insert into
EmpPrivilegios
        (idTipoEmpleado,idPrivilegio)
    values
        (2, 7),
        (2, 5),
        (2, 4);
    SET IDENTITY_INSERT TipoEmpleado OFF
END

if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 3) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (3, 'Bartender');

    insert into
EmpPrivilegios
        (idTipoEmpleado,idPrivilegio)
    values
        (3, 7),
        (3, 5),
        (3, 4);
    SET IDENTITY_INSERT TipoEmpleado OFF
END

if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 4) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (4, 'Cocinero');

    insert into
EmpPrivilegios
        (idTipoEmpleado,idPrivilegio)
    values
        (4, 6);
    SET IDENTITY_INSERT TipoEmpleado OFF
END

if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 5) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (5, 'Conserje');

    SET IDENTITY_INSERT TipoEmpleado OFF
END

if not exists(select *
from TipoEmpleado
where idTipoEmpleado = 6) 
BEGIN
    SET IDENTITY_INSERT TipoEmpleado ON

    insert into
TipoEmpleado
        (idTipoEmpleado,nombreTipoEmpleado)
    values
        (6, 'Gerente');

    insert into
EmpPrivilegios
        (idTipoEmpleado,idPrivilegio)
    values
        (6, 1),
        (6, 2),
        (6, 3),
        (6, 4),
        (6, 5),
        (6, 6),
        (6, 7);
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