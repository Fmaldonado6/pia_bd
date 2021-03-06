
IF OBJECT_ID('TipoAlimento','U') IS NULL CREATE TABLE TipoAlimento
(
    idTipoAlimento INT NOT NULL IDENTITY(1,1),
    constraint pkTipoAlimento primary key (idTipoAlimento),
    nombre varchar(200) NOT NULL
)

IF OBJECT_ID('Pais','U') IS NULL BEGIN
    CREATE TABLE Pais
    (
        idPais INT NOT NULL IDENTITY(1,1),
        constraint pkPais primary key (idPais),
        nombre varchar(200) NOT NULL
    )
END

IF OBJECT_ID('Estado','U') IS NULL BEGIN
    CREATE TABLE Estado
    (
        idEstado INT NOT NULL IDENTITY(1,1),
        constraint pkEstado primary key (idEstado),
        idPais INT NOT NULL,
        constraint fkPais foreign key (idPais) references Pais(idPais),
        nombre varchar(200) NOT NULL
    )
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
    idMunicipio INT NOT NULL,
    constraint fkMunicipio foreign key (idMunicipio) references Municipio(idMunicipio),
    nombre varchar(200) NOT NULL,
    constraint pkColonia primary key (idColonia)
)

IF OBJECT_ID('Calle','U') IS NULL  CREATE TABLE Calle
(
    idCalle INT NOT NULL IDENTITY(1,1),
    idColonia INT NOT NULL,
    constraint fkCalle foreign key (idColonia) references Colonia(idColonia),
    nombre varchar(200) NOT NULL,
    constraint pkCalle primary key (idCalle)

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
    nombreTipoEmpleado varchar(200) not null,
    horaEntrada varchar(20),
    horaSalida varchar(20),
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
    apellidoPaterno varchar(200) ,
    apellidoMaterno varchar(200) ,
    telefono Bigint,
    contrasena varchar(200) not null,
    fechaNacimiento Bigint ,
    idEmpleado int not null IDENTITY(1000,1),
    constraint pkEmpleado primary key (idEmpleado),
    idTipoEmpleado int not null,
    constraint fkTipoEmpleado foreign key (idTipoEmpleado) references TipoEmpleado(idTipoEmpleado),
    idPais int ,
    constraint fkEmpleadoPais foreign key (idPais) references Pais(idPais),
    idEstado int ,
    constraint fkEmpleadoEstado foreign key (idEstado) references Estado(idEstado),
    idMunicipio int ,
    constraint fkEmpleadoMunicipio foreign key (idMunicipio) references Municipio(idMunicipio),
    idColonia int ,
    constraint fkEmpleadoColonia foreign key (idColonia) references Colonia(idColonia),
    idCalle int ,
    constraint fkEmpleadoCalle foreign key (idCalle) references Calle(idCalle),
    numero int
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
    cantidadDisponible int not null,
    descripcion varchar(200) not null
)

if object_id('Pedidos','U') is null create table Pedidos
(
    idPedido int not null identity(1,1),
    constraint pkPedido primary key (idPedido),
    idEmpleado int not null,
    constraint fkEmpleado foreign key (idEmpleado) references Empleado(idEmpleado),
    fechaPedido Bigint not null,
    subtotal float not null,
    descuento float not null,
    total float not null
)

if object_id('PedidosAlimentos','U') is null create table PedidosAlimentos
(
    idPedido int not null,
    idAlimento int not null ,
    constraint pkPedidoAlimento primary key (idPedido,idAlimento),
    cantidad int not null,
    precio float not null,
    constraint fkPedidoAlimento foreign key (idPedido) references Pedidos(idPedido),
    constraint fkAlimentoPedido foreign key (idAlimento) references Alimentos(idAlimento)
)

IF OBJECT_ID ('Facturas','U') is null create table Facturas
(
    idFactura int not null identity(1,1),
    constraint pk_idFactura primary key (idFactura),
    idPedido int not null,
    nombre varchar (50) not null,
    apPaterno varchar (25) not null,
    apMaterno varchar (25) not null,
    telefono Bigint not null,
    RFC varchar (20) not null,
    fechaFactura Bigint not null,
    subtotal float not null,
    total float not null,
    descuento float not null,
    --Foreign
    idPais int ,
    constraint fk_idPais foreign key (idPais) references Pais(idPais),
    idEstado int ,
    constraint fk_idEstado foreign key (idEstado) references Estado(idEstado),
    idMunicipio int ,
    constraint fk_idMunicipio foreign key (idMunicipio) references Municipio(idMunicipio),
    idColonia int ,
    constraint fk_idColonia foreign key (idColonia) references Colonia(idColonia),
    idCalle int ,
    constraint fk_idCalle foreign key (idCalle) references Calle(idCalle),
    numero int,
    idPaisNegocio int ,
    constraint fk_idPaisNegocio foreign key (idPais) references Pais(idPais),
    idEstadoNegocio int ,
    constraint fk_idEstadoNegocio foreign key (idEstado) references Estado(idEstado),
    idMunicipioNegocio int ,
    constraint fk_idMunicipioNegocio foreign key (idMunicipio) references Municipio(idMunicipio),
    idColoniaNegocio int ,
    constraint fk_idColoniaNegocio foreign key (idColonia) references Colonia(idColonia),
    idCalleNegocio int ,
    constraint fk_idCalleNegocio foreign key (idCalle) references Calle(idCalle),
    numeroNegocio int
)

IF OBJECT_ID ('InfoNegocio','U') is null create table InfoNegocio
(
    idNegocio int not null identity(1,1),
    constraint pkIdNegocio primary key (idNegocio),
    nombre varchar(150) not null,
    horarioApertura varchar(150) not null,
    horarioCierre varchar(150) not null,
    telefono Bigint,
    idPais int ,
    constraint fk_idPaisNegocioInfo foreign key (idPais) references Pais(idPais),
    idEstado int ,
    constraint fk_idEstadoNegocioInfo foreign key (idEstado) references Estado(idEstado),
    idMunicipio int ,
    constraint fk_idMunicipioNegocioInfo foreign key (idMunicipio) references Municipio(idMunicipio),
    idColonia int ,
    constraint fk_idColoniaNegocioInfo foreign key (idColonia) references Colonia(idColonia),
    idCalle int ,
    constraint fk_idCalleNegocioInfo foreign key (idCalle) references Calle(idCalle),
    numero int
)


IF OBJECT_ID ('FacturasDetalle','U') is null create table FacturasDetalle
(
    idFactura int not null,
    idAlimento int not null,
    constraint pk_idFacturaDetalle primary key (idFactura,idAlimento),
    cantidad int not null,
    nombreAlimento varchar(150) not null,
    precio int not null
        constraint fk_facturaDetalle foreign key (idFactura) references Facturas(idFactura)
)


IF OBJECT_ID ('Ticket','U') is null create table Ticket
(
    idTicket int not null identity(1,1),
    constraint pkIdTicket primary key (idTicket),
    idPedido int not null,
    constraint fkTicketPedido foreign key (idPedido) references Pedidos(idPedido),
    nombreEmpleado varchar(150) not null,
    apellidoPaternoEmpleado varchar(150) not null,
    apellidoMaternoEmpleado varchar(150) not null,
    fechaTicket Bigint not null,
    subtotal float not null,
    descuento float not null,
    total float not null,
    telefono Bigint,
    idPais int ,
    constraint fk_TicketidPaisNegocioInfo foreign key (idPais) references Pais(idPais),
    idEstado int ,
    constraint fk_TicketidEstadoNegocioInfo foreign key (idEstado) references Estado(idEstado),
    idMunicipio int ,
    constraint fk_TicketidMunicipioNegocioInfo foreign key (idMunicipio) references Municipio(idMunicipio),
    idColonia int ,
    constraint fk_TicketidColoniaNegocioInfo foreign key (idColonia) references Colonia(idColonia),
    idCalle int ,
    constraint fk_TicketidCalleNegocioInfo foreign key (idCalle) references Calle(idCalle),
    numero int
)


IF OBJECT_ID ('TicketDetalle','U') is null create table TicketDetalle
(
    idTicket int not null,
    idAlimento int not null,
    constraint pkIdTicketDetalle primary key (idTicket,idAlimento),
    cantidad int not null,
    nombreAlimento varchar(150) not null,
    precio float not null
        constraint fk_ticketDetalle foreign key (idTicket) references Ticket(idTicket)
)