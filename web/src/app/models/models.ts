export class Empleado {
    idEmpleado: number = 0
    nombre: string = ""
    apellidoPaterno: string = ""
    apellidoMaterno: string = ""
    telefono: string = ""
    idPais: number = 0
    idMunicipio: number = 0
    idEstado: number = 0
    idColonia: number = 0
    idCalle: number = 0
    idTipoEmpleado: number = 0
    numero: number = 0
    nombrePais: string = ""
    nombreEstado: string = ""
    nombreMunicipio: string = ""
    nombreColonia: string = ""
    nombreCalle: string = ""
    fechaNacimiento: Date = new Date()
    contrasena: string = ""
    tipoEmpleado: TipoEmpleado = new TipoEmpleado()
    privilegios: Privilegios[] = []
}

export class TipoEmpleado {
    idTipoEmpleado: number = 0
    nombreTipoEmpleado: string = ""
    sueldo: number = 0
    horaEntrada: Date = new Date()
    horaSalida: Date = new Date()
    privilegios: Privilegios[] = []
}

export class Privilegios {
    idPrivilegio: number = 0
    nombre: string = ""
}

export class Alimentos {
    idAlimento: number = 0
    idTipoAlimento: number = 0
    idMarca: string = ""
    nombre: string = ""
    precio: number = 0
    descripcion: string = ""
    cantidadDisponible: number = 0
}

export class TipoAlimento {
    idTipoAlimento: number = 0
    nombre: string = ""
}

export class Marca {
    idMarca: number = 0
    nombreMarca: string = ""
}

export class AlimentosFull extends Alimentos {
    marca: Marca = new Marca()
    tipoAlimento = new TipoAlimento()

}

export class Pedido {
    idPedido: number = 0
    idEmpleado: number = 0
    fechaPedido?: Date
    subtotal: number = 0
    descuento: number = 0
    total: number = 0
    alimentos: PedidoAlimento[] = []

}

export class PedidoAlimento {
    idPedido: number = 0
    idAlimento: number = 0
    cantidad: number = 0
    precio: number = 0
    alimento: Alimentos = new Alimentos()
}

export class InfoSucursal {
    nombre: string = ""
    horario: string = ""
    idPais: number = 0
    idEstado: number = 0
    idMunicipio: number = 0
    idColonia: number = 0
    idCalle: number = 0
    numero: number = 0
}

export class Pais {
    idPais: number = 0
    nombre: string = ""
}

export class Estado {
    idEstado: number = 0
    nombre: string = ""
    idPais: number = 0
}

export class Municipio {
    idMunicipio: number = 0
    nombre: string = ""
    idEstado: number = 0
}

export class Colonia {
    idColonia: number = 0
    nombre: string = ""
    idMunicipio: number = 0
}

export class Calle {
    idCalle: number = 0
    nombre: string = ""
    idColonia: number = 0
}

export class Factura {
    idFactura: number = 0
    fechaFactura: Date = new Date()
    RFC: string = ""
    idPedido: number = 0
    concepto: string = ""
    idPais: number = 0
    idEstado: number = 0
    idMunicipio: number = 0
    idColonia: number = 0
    idCalle: number = 0
    numero: number = 0
    idPaisNegocio: number = 0
    idEstadoNegocio: number = 0
    idMunicipioNegocio: number = 0
    idColoniaNegocio: number = 0
    idCalleNegocio: number = 0
    numeroNegocio: number = 0
    nombre: string = ""
    apPaterno: string = ""
    apMaterno: string = ""
    telefono: string = ""
    total = 0
    subtotal = 0
    descuento = 0
}

export class FacturaResource extends Factura {
    nombrePais: string = ""
    nombreEstado: string = ""
    nombreMunicipio: string = ""
    nombreColonia: string = ""
    nombreCalle: string = ""
    nombrePaisNegocio: string = ""
    nombreEstadoNegocio: string = ""
    nombreMunicipioNegocio: string = ""
    nombreColoniaNegocio: string = ""
    nombreCalleNegocio: string = ""
    numeroNegocio = 0
    telefonoNegocio = 0
    detalles: FacturaDetalle[] = []
}

export class FacturaDetalle {
    idFactura: number = 0
    idAlimento: number = 0
    cantidad: number = 0
    nombreAlimento: string = ""
    precio: number = 0
}

export enum PrivilegiosId {
    gestionarUsuarios = 1,
    gestionarPedidos,
    gestionarAlimentos,
    gestionarFacturas,
    gestionarTipoEmpleado,
}
export interface Token {
    idEmpleado: number
}

export interface SectionCard {
    title: string
    icon: string
    description: string
    action: string,
    onClick: Function
}

export class Ticket {
    idTicket: number = 0
    nombreEmpleado: string = ""
    apellidoPaternoEmpleado: string = ""
    apellidoMaternoEmpleado: string = ""
    fechaTicket = new Date()
    subtotal: number = 0
    descuento: number = 0
    telefono = 0
    total: number = 0
    idPais: number = 0
    idEstado: number = 0
    idMunicipio: number = 0
    idColonia: number = 0
    idCalle: number = 0
    numero: number = 0
    idPedido = 0
}

export class TicketDetalle {

    idTicket = 0
    idAlimento = 0
    cantidad = 0
    nombreAlimento = ""
    precio = 0

}

export class TicketResource extends Ticket {

    nombrePais = ""
    nombreEstado = ""
    nombreMunicipio = ""
    nombreColonia = ""
    nombreCalle = ""
    detalles: TicketDetalle[] = []

}

export enum Status {
    loading,
    loaded,
    error,
    empty,
    success,
    forbidden
}

export class PasswordResponse {
    oldPasswrod: string = ""
    newPassword: string = ""
    idEmpleado: number = 0
}

