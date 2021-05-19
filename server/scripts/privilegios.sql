
if not exists(select *
from Privilegios
where idPrivilegio = 1) 
BEGIN
    SET IDENTITY_INSERT Privilegios ON

    insert into Privilegios
    (idPrivilegio, nombre)
VALUES
    (1, 'Gestionar Usuarios');
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
    (2, 'Gestionar Pedidos');
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
    (3, 'Gestionar alimentos');
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
    (4, 'Gestionar facturas');
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
    (5, 'Gestionar tipo de empleado');
    SET IDENTITY_INSERT Privilegios OFF
END