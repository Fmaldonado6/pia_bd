import { database } from './../database';
import { Factura, FacturaDetalle } from './../../models/models';
import { BaseRepository } from './baseRepository';
class FacturasRepository implements BaseRepository<Factura> {

    async add(obj: Factura): Promise<Factura> {
        const date = new Date(obj.fechaFactura)
        const res = await database.executeQuery(`
        insert into Facturas(
            idPedido, concepto, nombre, apPaterno,
            apMaterno, telefono, RFC, fechaFactura, idPais, idEstado,
            idMunicipio, idColonia, idCalle, numero, total, subtotal, descuento
        ) 
        output Inserted.idFactura
        values (
            ${obj.idPedido}, '${obj.concepto}' , 
            '${obj.nombre}', '${obj.apPaterno}', '${obj.apMaterno}' , ${obj.telefono} ,
            '${obj.RFC}', ${date.getTime()}, '${obj.idPais}', '${obj.idEstado}',
            '${obj.idMunicipio}', '${obj.idColonia}', '${obj.idCalle}', ${obj.numero}, ${obj.total},
            ${obj.subtotal}, ${obj.descuento}
        )`)

        return res!![0]
    }

    async get(id: number): Promise<Factura | null> {

        const res = await database.executeQuery(`
            select * from Facturas where idFactura = ${id}
        `)

        if (!res)
            return null

        return res[0] as Factura

    }
    async findAll(): Promise<Factura[]> {
        const res = await database.executeQuery(`select * from Facturas`)

        if (!res)
            return []

        return res
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Facturas where idFactura = ${id}
        `)
    }

    async update(obj: Factura): Promise<Factura> {
        const date = new Date(obj.fechaFactura)
        await database.executeQuery(`
        update Facturas
            set idPedido = ${obj.idPedido} , concepto = '${obj.concepto}', 
            nombre = '${obj.nombre}', apPaterno = '${obj.apPaterno}', apMaterno = '${obj.apMaterno}', 
            telefono = ${obj.telefono}, RFC = '${obj.RFC}', fechaFactura = ${date.getTime()}, 
            idPais = '${obj.idPais}', idEstado = '${obj.idEstado}', idMunicipio = '${obj.idMunicipio}',
            idColonia = '${obj.idColonia}', idCalle = '${obj.idCalle}', numero = ${obj.numero}, total = ${obj.total},
            subtotal = ${obj.subtotal}, descuento = ${obj.descuento}
        where idFactura = ${obj.idFactura}
        
        `)

        return obj
    }
}

class FacturaDetalleRepository {

    async add(obj: FacturaDetalle): Promise<FacturaDetalle> {
        await database.executeQuery(`
        insert into FacturasDetalle(
            idFactura, idAlimento, cantidad,nombreAlimento ,precio
        ) 
        values (
            ${obj.idFactura}, ${obj.idAlimento}, ${obj.cantidad},'${obj.nombreAlimento}', ${obj.precio}
        )`)

        return obj
    }



    async get(id: number): Promise<FacturaDetalle | null> {
        const res = await database.executeQuery(`
            select * from FacturasDetalle where idFactura = ${id}
        `)
        if (!res)
            return null

        return res[0]
    }


    async getFacturaDetalleByFacturaId(id: number): Promise<FacturaDetalle[]> {
        const res = await database.executeQuery(`
        select * from FacturasDetalle
        where idFactura = ${id}
        `)

        if (!res)
            return []

        return res as FacturaDetalle[]
    }

    async getFacturaDetalleByAlimentoId(id: number): Promise<FacturaDetalle[]> {
        const res = await database.executeQuery(`
        select * from FacturasDetalle
        where idAlimento = ${id}
        `)

        if (!res)
            return []

        return res as FacturaDetalle[]
    }



    async delete(idPedido: number, idAlimento: number): Promise<void> {
        await database.executeQuery(`
            delete from FacturasDetalle 
            where idFactura = ${idPedido} and idAlimento = ${idAlimento}
        `)
    }

    async update(obj: FacturaDetalle): Promise<FacturaDetalle> {
        await database.executeQuery(`
        update FacturasDetalle
        set cantidad = ${obj.cantidad}, precio = ${obj.precio}, nombreAlimento = '${obj.nombreAlimento}'
        where idFactura = ${obj.idFactura} and idAlimento = ${obj.idAlimento}
    `)

        return obj
    }
}


export const facturasRepository = new FacturasRepository()
export const facturaDetalleRepository = new FacturaDetalleRepository()