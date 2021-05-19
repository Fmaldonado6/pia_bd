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

class PedidoAlimentoRepository {

    async add(obj: PedidoAlimento): Promise<PedidoAlimento> {
        const res = await database.executeQuery(`
        insert into PedidosAlimentos(
            idPedido, idAlimento, cantidad, precio
        ) 
        values (
            ${obj.idPedido}, ${obj.idAlimento}, ${obj.cantidad}, ${obj.precio}
        )`)

        return new PedidoAlimento()
    }


    async addAllPedidoAlimento(arr: PedidoAlimento[]): Promise<PedidoAlimento[]> {

        for(var i = 0; i < arr.length; i++){
            this.add(arr[i]);
        }

    }


    async get(id: number): Promise<PedidoAlimento | null> {
        const res = await database.executeQuery(`
            select idPedido, idAlimento, nombre, cantidad, precio, idMarca, idTipoAlimento, 
            cantidadDisponible, descripcion  from PedidosAlimentos as pa 
            inner join Alimentos as a on pa.idAlimento = a.idAlimento
            where idPedido = ${id}
        `)
        if (!res)
            return null

        return res[0] 
    }

    async getPedidosAlimentosByPedidoId(id: number): Promise<PedidoAlimento[]> {
        const res = await database.executeQuery(`
        select idPedido, idAlimento, nombre, cantidad, precio, idMarca, idTipoAlimento, 
        cantidadDisponible, descripcion  from PedidosAlimentos as pa 
        inner join Alimentos as a on pa.idAlimento = a.idAlimento
        where idPedido = ${id}
        `)

        if (!res)
            return []

        return res as PedidoAlimento[]
    }


    async delete(idPedido: number, idAlimento: number): Promise<void> {
        await database.executeQuery(`
            delete from PedidosAlimentos where idPedido = ${idPedido} and idAlimento = ${idAlimento}
        `)
    }

    async update(obj: PedidoAlimento): Promise<PedidoAlimento> {
        await database.executeQuery(`
        update PedidosAlimentos
        set cantidad = ${obj.cantidad}, precio = ${obj.precio}
    `)

        return obj
    }
}

export const pedidosRepository = new PedidosRepository()
export const pedidoAlimentoRepository = new PedidoAlimentoRepository()