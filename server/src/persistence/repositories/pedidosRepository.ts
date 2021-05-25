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


        return res!![0] as Pedido
    }


    async get(id: number): Promise<Pedido | null> {

        const res = await database.executeQuery(`
            select * from Pedidos where idPedido = ${id}
        `)

        if (!res)
            return null

        const pedido = res[0] as Pedido

        pedido.fechaPedido = new Date(res[0].fechaPedido)

        return pedido

    }

    async getPedidosByEmpleadoId(idEmpleado: number): Promise<Pedido[]> {

        const res = await database.executeQuery(`
        select * from Pedidos where idEmpleado = ${idEmpleado}
    `)

        if (!res)
            return []

        return res
    }

    async findAll(): Promise<Pedido[]> {
        const res = await database.executeQuery(`select * from Pedidos order by fechaPedido DESC`)

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
        await database.executeQuery(`
        insert into PedidosAlimentos(
            idPedido, idAlimento, cantidad, precio
        ) 
        values (
            ${obj.idPedido}, ${obj.idAlimento}, ${obj.cantidad}, ${obj.precio}
        )`)

        return obj
    }


    async addAllPedidoAlimento(arr: PedidoAlimento[]): Promise<void> {

        for (let alimento of arr) {
            this.add(alimento);
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

    // select idPedido, idAlimento,  cantidad, precio, nombre, idMarca, idTipoAlimento, 
    //     cantidadDisponible, descripcion  from PedidosAlimentos as pa 
    //     inner join Alimentos as a on pa.idAlimento = a.idAlimento
    //     where idPedido = ${id}
    async getPedidosAlimentosByPedidoId(id: number): Promise<PedidoAlimento[]> {
        const res = await database.executeQuery(`
        select idPedido, idAlimento,  cantidad, precio from PedidosAlimentos
        where idPedido = ${id}
        `)

        if (!res)
            return []

        return res as PedidoAlimento[]
    }

    async getPedidosAlimentosByAlimentoId(id: number): Promise<PedidoAlimento[]> {
        const res = await database.executeQuery(`
        select * from PedidosAlimentos
        where idAlimento = ${id}
        `)

        if (!res)
            return []

        return res as PedidoAlimento[]
    }

  

    async delete(idPedido: number, idAlimento: number): Promise<void> {
        await database.executeQuery(`
            delete from PedidosAlimentos 
            where idPedido = ${idPedido} and idAlimento = ${idAlimento}
        `)
    }

    async update(obj: PedidoAlimento): Promise<PedidoAlimento> {
        await database.executeQuery(`
        update PedidosAlimentos
        set cantidad = ${obj.cantidad}, precio = ${obj.precio}
        where idPedido = ${obj.idPedido} and idAlimento = ${obj.idAlimento}
    `)

        return obj
    }

    
}

export const pedidosRepository = new PedidosRepository()
export const pedidoAlimentoRepository = new PedidoAlimentoRepository()