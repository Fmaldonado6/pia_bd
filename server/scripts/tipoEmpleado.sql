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