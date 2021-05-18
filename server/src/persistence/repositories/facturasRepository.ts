import { database } from './../database';
import { Factura } from './../../models/models';
import { BaseRepository } from './baseRepository';
class FacturasRepository implements BaseRepository<Factura> {

    async add(obj: Factura): Promise<Factura> {
        const date = new Date(obj.fechaFactura)
        const res = await database.executeQuery(`
        insert into Facturas(
            idPedido, razonSocial, concepto, nombre, apPaterno,
            apMaterno, telefono, RFC, fechaFactura, idPais, idEstado,
            idMunicipio, idColonia, idCalle, numero
        ) 
        output Inserted.idFactura
        values (
            ${obj.idPedido}, '${obj.razonSocial}', '${obj.concepto}' , 
            '${obj.nombre}', '${obj.apPaterno}', '${obj.apMaterno}' , ${obj.telefono} ,
            '${obj.RFC}', ${date.getTime()}, '${obj.idPais}', '${obj.idEstado}',
            '${obj.idMunicipio}', '${obj.idColonia}', '${obj.idCalle}', ${obj.numero}
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
            set idPedido = ${obj.idPedido} , razonSocial = '${obj.razonSocial}', concepto = '${obj.concepto}', 
            nombre = '${obj.nombre}', apPaterno = '${obj.apPaterno}', apMaterno = '${obj.apMaterno}', 
            telefono = ${obj.telefono}, RFC = '${obj.RFC}', fechaFactura = ${date.getTime()}, 
            idPais = '${obj.idPais}', idEstado = '${obj.idEstado}', idMunicipio = '${obj.idMunicipio}',
            idColonia = '${obj.idColonia}', idCalle = '${obj.idCalle}', numero = ${obj.numero}
        where idFactura = ${obj.idFactura}
        
        `)

        return obj
    }
}

export const facturasRepository = new FacturasRepository()
