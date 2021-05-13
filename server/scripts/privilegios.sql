
if not exists(select *
from Privilegios
where idPrivilegio = 1) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (1, 'Crear Usuarios');
    SET IDENTITY_INSERT Privilegios OFF
END


if not exists(select *
from Privilegios
where idPrivilegio = 2) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (2, 'Borrar Usuarios');
    SET IDENTITY_INSERT Privilegios OFF
END


if not exists(select *
from Privilegios
where idPrivilegio = 3) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (3, 'Editar Usuarios');
    SET IDENTITY_INSERT Privilegios OFF
END

if not exists(select *
from Privilegios
where idPrivilegio = 4) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (4, 'Crear Pedidos');
    SET IDENTITY_INSERT Privilegios OFF
END

if not exists(select *
from Privilegios
where idPrivilegio = 5) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (5, 'Ver Pedidos');
    SET IDENTITY_INSERT Privilegios OFF
END

if not exists(select *
from Privilegios
where idPrivilegio = 6) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (6, 'Almacenar alimentos');
    SET IDENTITY_INSERT Privilegios OFF
END

if not exists(select *
from Privilegios
where idPrivilegio = 7) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (7, 'Crear facturas');
    SET IDENTITY_INSERT Privilegios OFF
END