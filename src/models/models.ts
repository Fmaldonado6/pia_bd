export class Empleado {
    idEmpleado: string = ""
    nombre: string = ""
    telefono: string = ""
    idPais: string = ""
    idMunicipio: string = ""
    idEstado: string = ""
    idColonia: string = ""
    idCalle: string = ""
    idTipoEmpleado: string = ""
    numero: number = 0
    fechaNacimiento: Date = new Date()
    contrasena: string = ""
}

export class TipoEmpleado {
    idTipoEmpleado: string = ""
    nombreTipoEmpleado: string = ""
    sueldo: number = 0
    horaEntrada: Date = new Date()
    horaSalida: Date = new Date()
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
    idTipoAlimento: string = ""
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

export class InfoSucursal {
    nombre: string = ""
    horario: string = ""
    idPais: string = ""
    idEstado: string = ""
    idMunicipio: string = ""
    idColonia: string = ""
    idCalle: string = ""
    numero: number = 0
}

export class Pais {
    idPais: string = ""
    descripcion: string = ""
}

export class Estado {
    idEstado: string = ""
    descripcion: string = ""
    idPais: string = ""
}

export class Municipio {
    idMunicipio: string = ""
    descripcion: string = ""
    idEstado: string = ""
}

export class Colonia {
    idColonia: string = ""
    descripcion: string = ""
    idMunicipio: string = ""
}

export class Calle {
    idCalle: string = ""
    descripcion: string = ""
    idColonia: string = ""
}

export class Factura {
    idFactura: string = ""
    fechaFactura: Date = new Date()
    RFC: string = ""
    idPedido: string = ""
    concepto: string = ""
    razonSocial: string = ""
    idPais: string = ""
    idEstado: string = ""
    idMunicipio: string = ""
    idColonia: string = ""
    idCalle: string = ""
    numero: number = 0
    nombre: string = ""
    apPaterno: string = ""
    apMaterno: string = ""
    telefono: string = ""
}