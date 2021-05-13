export class Empleado {
    idEmpleado: number = 0
    nombre: string = ""
    telefono: string = ""
    idPais: number = 0
    idMunicipio: number = 0
    idEstado: number = 0
    idColonia: number = 0
    idCalle: number = 0
    idTipoEmpleado: number = 0
    numero: number = 0
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
    nombreTipo: string = ""
}

export class Marca {
    idMarca: number = 0
    nombreMarca: string = ""
}

export class Pedido {
    idPedido: number = 0
    idEmpleado: number = 0
    fechaPedido?: Date
    subtotal: number = 0
    descuento: number = 0
    total: number = 0
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
    razonSocial: string = ""
    idPais: number = 0
    idEstado: number = 0
    idMunicipio: number = 0
    idColonia: number = 0
    idCalle: number = 0
    numero: number = 0
    nombre: string = ""
    apPaterno: string = ""
    apMaterno: string = ""
    telefono: string = ""
}

export interface Token {
    idEmpleado: number
}

export enum Status {
    loading,
    loaded,
    error,
    empty
}