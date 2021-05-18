import { database } from './../database';
import { Pedido, PedidoAlimento } from './../../models/models';
import { BaseRepository } from './baseRepository';
class PedidosRepository implements BaseRepository<Pedido> {

    async add(obj: Pedido): Promise<Pedido> {
        const date = new Date(obj.fechaPedido!!)
        const res = await database.executeQuery(`
        insert into Pedidos(
            idEmpleado, fechaPedido, subtotal, descuento, total
        ) 
        output Inserted.idPedido
        values (
            ${obj.idEmpleado}, ${date.getTime()}, ${obj.subtotal}, 
            ${obj.descuento}, ${obj.total}
        )`)

        return res!![0]
    }


    async get(id: number): Promise<Pedido | null> {

        const res = await database.executeQuery(`
            select * from Pedidos where idPedido = ${id}
        `)

        if (!res)
            return null

        return res[0] as Pedido

    }
    async findAll(): Promise<Pedido[]> {
        const res = await database.executeQuery(`select * from Pedidos`)

        if (!res)
            return []

        return res
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Pedidos where idPedido = ${id}
        `)
    }

    async update(obj: Pedido): Promise<Pedido> {
        const date = new Date(obj.fechaPedido!!)
        await database.executeQuery(`
        update Pedidos
            set idEmpleado = ${obj.idEmpleado}, fechaPedido = ${date.getTime()}, 
            subtotal = ${obj.subtotal}, descuento = ${obj.descuento}, total = ${obj.total}

        where idPedido = ${obj.idPedido}
        
        `)

        return obj
    }
}


