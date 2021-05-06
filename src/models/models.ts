export class Empleado {
    idEmpleado: string = ""
    nombre?: string
    telefono?: string
    idPais: string = ""
    idMunicipio: string = ""
    idEstado: string = ""
    idColonia: string = ""
    idCalle: string = ""
    idTipoEmpleado: string = ""
    numero: number = 0
    fechaNacimiento?: Date
    contrasena: string = ""
}

export class TipoEmpleado {
    idTipoEmpleado: string = ""
    nombreTipoEmpleado: string = ""
    sueldo: number = 0
    horaEntrada?: Date
    horaSalida?: Date
}

export class Privilegios {
    idPrivilegio: string = ""
    nombre: string = ""
}

export class Alimentos {
    idAlimento: string = ""
    idTipoAlimento: string = ""
    idMarca: string = ""
    nombre: string = ""
    precio: number = 0
    descripcion: string = ""
    cantidadDisponible: number = 0
}

export class TipoAlimento {
    tipoAlimento: string = ""
    nombreTipo: string = ""
}

export class Marca {
    idMarca: string = ""
    nombreMarca: string = ""
}

export class Pedido {
    idPedido: string = ""
    idEmpleado: string = ""
    fechaPedido?: Date
    subtotal: number = 0
    descuento: number = 0
    total: number = 0
}