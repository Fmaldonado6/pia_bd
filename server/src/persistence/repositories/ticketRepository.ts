import { database } from './../database';
import { Ticket, TicketDetalle } from '../../models/models';
import { BaseRepository } from './baseRepository';
class TicketRepository implements BaseRepository<Ticket>{
    async add(obj: Ticket): Promise<Ticket> {

        const date = new Date(obj.fechaTicket)

        const res = await database.executeQuery(`
            insert into Ticket(
                nombreEmpleado, apellidoPaternoEmpleado, apellidoMaternoEmpleado,
                fechaTicket, subtotal, descuento, total, telefono, idPais,
                idEstado, idMunicipio, idColonia, idCalle, numero,idPedido
            ) 
            output Inserted.idTicket
            values(
                '${obj.nombreEmpleado}','${obj.apellidoPaternoEmpleado}','${obj.apellidoMaternoEmpleado}',
                ${date.getTime()},${obj.subtotal},${obj.descuento},${obj.total},${obj.telefono},${obj.idPais},
                ${obj.idEstado},${obj.idMunicipio},${obj.idColonia},${obj.idCalle},${obj.numero},${obj.idPedido}
            )
        `)

        return res!![0]
    }
    async get(id: number): Promise<Ticket | null> {
        const res = await database.executeQuery(`select * from Ticket where idTicket = ${id}`)

        if (!res)
            return null

        return res[0]
    }
    async findAll(): Promise<Ticket[]> {
        const res = await database.executeQuery(`select * from Ticket order by fechaTicket DESC`)

        if (!res)
            return []

        return res

    }
    update(obj: Ticket): Promise<Ticket> {
        throw new Error('Method not implemented.');
    }
    async delete(id: number): Promise<void> {
        const res = await database.executeQuery(`delete from Ticket where idTicket = ${id}`)
    }

}

class TicketDetalleRepository {


    async add(obj: TicketDetalle): Promise<TicketDetalle> {
        await database.executeQuery(`
        insert into TicketDetalle(
            idTicket, idAlimento, cantidad,nombreAlimento ,precio
        ) 
        values (
            ${obj.idTicket}, ${obj.idAlimento}, ${obj.cantidad},'${obj.nombreAlimento}', ${obj.precio}
        )`)

        return obj
    }



    async get(id: number): Promise<TicketDetalle | null> {
        const res = await database.executeQuery(`
            select * from TicketDetalle where idTicket = ${id}
        `)
        if (!res)
            return null

        return res[0]
    }


    async getTicketDetalleByTicketId(id: number): Promise<TicketDetalle[]> {
        const res = await database.executeQuery(`
        select * from TicketDetalle
        where idTicket = ${id}
        `)

        if (!res)
            return []

        return res as TicketDetalle[]
    }

    async getTicketDetalleByAlimentoId(id: number): Promise<TicketDetalle[]> {
        const res = await database.executeQuery(`
        select * from TicketDetalle
        where idAlimento = ${id}
        `)

        if (!res)
            return []

        return res as TicketDetalle[]
    }



    async delete(idTicket: number, idAlimento: number): Promise<void> {
        await database.executeQuery(`
            delete from TicketDetalle 
            where idTicket = ${idTicket} and idAlimento = ${idAlimento}
        `)
    }

    async update(obj: TicketDetalle): Promise<TicketDetalle> {
        await database.executeQuery(`
        update TicketDetalle
        set cantidad = ${obj.cantidad}, precio = ${obj.precio}, nombreAlimento = '${obj.nombreAlimento}'
        where idTIcket = ${obj.idTicket} and idAlimento = ${obj.idAlimento}
    `)

        return obj
    }
}

export const ticketDetalleRepository = new TicketDetalleRepository()
export const ticketRepository = new TicketRepository()