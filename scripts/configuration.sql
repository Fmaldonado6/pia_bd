
IF OBJECT_ID('TipoAlimento','U') IS NULL CREATE TABLE TipoAlimento
(
    idTipoAlimento INT NOT NULL IDENTITY(1,1),
    constraint pkTipoAlimento primary key (idTipoAlimento),
    nombre varchar(200) NOT NULL
)

IF OBJECT_ID('Pais','U') IS NULL BEGIN CREATE TABLE Pais
(
    idPais INT NOT NULL IDENTITY(1,1),
    constraint pkPais primary key (idPais),
    nombre varchar(200) NOT NULL
) 
SET IDENTITY_INSERT Pais ON
END

IF OBJECT_ID('Estado','U') IS NULL BEGIN CREATE TABLE Estado
(
    idEstado INT NOT NULL IDENTITY(1,1),
    constraint pkEstado primary key (idEstado),
    idPais INT NOT NULL,
    constraint fkPais foreign key (idPais) references Pais(idPais),
    nombre varchar(200) NOT NULL
)
SET IDENTITY_INSERT Estado ON
END

IF OBJECT_ID('Municipio','U') IS NULL CREATE TABLE Municipio
(
    idMunicipio INT NOT NULL IDENTITY(1,1),
    constraint pkMunicipio primary key (idMunicipio),
    idEstado INT NOT NULL,
    constraint fkEstado foreign key (idEstado) references Estado(idEstado),
    nombre varchar(200) NOT NULL
)

IF OBJECT_ID('Colonia','U') IS NULL CREATE TABLE Colonia
(
    idColonia INT NOT NULL IDENTITY(1,1),
    constraint pkColonia primary key (idColonia),
    idMunicipio INT NOT NULL,
    constraint fkMunicipio foreign key (idMunicipio) references Municipio(idMunicipio),
    nombre varchar(200) NOT NULL
)

IF OBJECT_ID('Calle','U') IS NULL  CREATE TABLE Calle
(
    idCalle INT NOT NULL IDENTITY(1,1),
    constraint pkCalle primary key (idCalle),
    idColonia INT NOT NULL,
    constraint fkCalle foreign key (idCalle) references Colonia(idColonia),
    nombre varchar(200) NOT NULL
)

if object_id('Privilegios','U') is null create table Privilegios
(
    idPrivilegio int not null IDENTITY(1,1),
    constraint pkPrivilegio primary key (idPrivilegio),
    nombre varchar(200),
)

if object_id('TipoEmpleado','U') is null create table TipoEmpleado
(
    idTipoEmpleado int not null IDENTITY(1,1),
    constraint pkTipoEmpleado primary key (idTipoEmpleado),
    nombreTipoEmpleado varchar(200),
    horaEntrada time not null,
    horaSalida time not null,
    sueldo float
)

if object_id('EmpPrivilegios','U') is null create table EmpPrivilegios
(
    idTipoEmpleado int not null,
    idPrivilegio int not null,
    constraint fkTipoEmpleadoPrivilegio foreign key (idTipoEmpleado) references TipoEmpleado(idTipoEmpleado),
    constraint fkPrivilegioTipoEmpleado foreign key (idPrivilegio) references Privilegios(idPrivilegio),
    constraint pkPrivilegioEmp primary key (idTipoEmpleado, idPrivilegio),
)

if object_id('Empleado','U') is null create table Empleado
(
    nombre varchar(200) not null,
    telefono int,
    contrasena varchar(200),
    fechaNacimiento DATE not null,
    idEmpleado int not null IDENTITY(1000,1),
    constraint pkEmpleado primary key (idEmpleado),
    idTipoEmpleado int not null,
    constraint fkTipoEmpleado foreign key (idTipoEmpleado) references TipoEmpleado(idTipoEmpleado),
    idPais int not null,
    constraint fkEmpleadoPais foreign key (idPais) references Pais(idPais),
    idEstado int not null,
    constraint fkEmpleadoEstado foreign key (idEstado) references Estado(idEstado),
    idMunicipio int not null,
    constraint fkEmpleadoMunicipio foreign key (idMunicipio) references Municipio(idMunicipio),
    idColonia int not null,
    constraint fkEmpladoColonia foreign key (idColonia) references Colonia(idColonia),
    idCalle int not null,
    constraint fkEmpleadoCalle foreign key (idCalle) references Calle(idCalle),
    numero tinyInt not null
)

if object_id('Marca','U') is null create table Marca
(
    nombreMarca varchar(200) not null,
    idMarca int not null identity(1,1),
    constraint pkMarca primary key (idMarca)
)

if object_id('Alimentos','U') is null create table Alimentos
(
    idAlimento int not null identity(1,1),
    constraint pkAlimento primary key (idAlimento),
    nombre varchar(200) not null,
    idMarca int not null,
    constraint fkMarca foreign key (idMarca) references Marca(idMarca),
    idTipoAlimento int not null,
    constraint fkTipoAlimento foreign key (idTipoAlimento ) references TipoAlimento(idTipoAlimento),
    precio float not null,
)

if object_id('Pedidos','U') is null create table Pedidos
(
    idPedido int not null identity(1,1),
    constraint pkPedido primary key (idPedido),
    fechaPedido DATETIME not null,
    subtotal float not null,
    desceutno float not null,
    total float not null
)

if object_id('PedidosAlimentos','U') is null create table PedidosAlimentos
(
    idPedido int not null ,
    idAlimento int not null ,
    constraint pkPedidoAlimento primary key (idPedido,idAlimento),
    cantidad int not null,
    constraint fkPedidoAlimento foreign key (idPedido) references Pedidos(idPedido),
    constraint fkAlimentoPedido foreign key (idAlimento) references Alimentos(idAlimento),
)

