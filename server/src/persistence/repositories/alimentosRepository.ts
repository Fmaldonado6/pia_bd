import { database } from './../database';
import { Alimentos, TipoAlimento, Marca } from './../../models/models';
import { BaseRepository } from './baseRepository';
class AlimentosRepository implements BaseRepository<Alimentos>
{

    async add(obj: Alimentos): Promise<Alimentos> {

        const res = await database.executeQuery(`
        insert into Alimentos(
            nombre,idMarca, idTipoAlimento,precio, 
            cantidadDisponible, descripcion
        ) 
        output Inserted.idAlimento
        values (
            '${obj.nombre}',${obj.idMarca},${obj.idTipoAlimento},
            ${obj.precio},${obj.cantidadDisponible},'${obj.descripcion}'
        )`)

        return res!![0]
    }

    async get(id: number): Promise<Alimentos | null> {

        const res = await database.executeQuery(`
            select * from Alimentos where idAlimento = ${id}
        `)

        if (!res)
            return null

        return res[0] as Alimentos

    }

    async getAlimentosByMarcaId(idMarca: number): Promise<Alimentos[]> {

        const res = await database.executeQuery(`
            select * from Alimentos where idMarca = ${idMarca}
        `)

        if (!res)
            return []

        return res
    }


    async getAlimentosByTipoId(idTipo: number): Promise<Alimentos[]> {

        const res = await database.executeQuery(`
            select * from Alimentos where idTipoAlimento = ${idTipo}
        `)

        if (!res)
            return []

        return res
    }

    async addAlimentoQuantityById(id: number, quantity: number) {
        await database.executeQuery(`
        update Alimentos set cantidadDisponible = cantidadDisponible + ${quantity}
        where idAlimento = ${id}
        `)
    }

    async findAll(): Promise<Alimentos[]> {
        const res = await database.executeQuery(`select * from Alimentos`)

        if (!res)
            return []

        return res
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Alimentos where idAlimento = ${id}
        `)
    }

    async update(obj: Alimentos): Promise<Alimentos> {
        await database.executeQuery(`
        update Alimentos
            set nombre = '${obj.nombre}', idMarca = ${obj.idMarca}, 
            idTipoAlimento = ${obj.idTipoAlimento}, precio = ${obj.precio},
            cantidadDisponible = ${obj.cantidadDisponible}, descripcion = '${obj.descripcion}'
        where idAlimento = ${obj.idAlimento}
        
        `)

        return obj
    }
}

class TipoAlimentoRepository implements BaseRepository<TipoAlimento> {

    async add(obj: TipoAlimento): Promise<TipoAlimento> {
        const res = await database.executeQuery(`
        insert into TipoAlimento(
            nombre
        ) 
        output Inserted.idTipoAlimento
        values (
            '${obj.nombre}'
        )`)

        return res!![0]
    }




    async get(id: number): Promise<TipoAlimento | null> {
        const res = await database.executeQuery(`
            select * from TipoAlimento where idTipoAlimento = ${id}
        `)

        if (!res)
            return null

        return res[0] as TipoAlimento
    }



    async findAll(): Promise<TipoAlimento[]> {
        const res = await database.executeQuery(`select * from TipoAlimento`)

        if (!res)
            return []

        return res as TipoAlimento[]
    }

    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from TipoAlimento where idTipoAlimento = ${id}
        `)
    }

    async update(obj: TipoAlimento): Promise<TipoAlimento> {
        await database.executeQuery(`
        update TipoAlimento
        set 
        nombre='${obj.nombre}'
        where idTipoAlimento = ${obj.idTipoAlimento}
    `)

        return obj
    }
}

class MarcaRepository implements BaseRepository<Marca> {

    async add(obj: Marca): Promise<Marca> {
        const res = await database.executeQuery(`
        insert into Marca(
            nombreMarca
        ) 
        output Inserted.idMarca
        values (
           '${obj.nombreMarca}'
        )`)

        return res!![0]
    }




    async get(id: number): Promise<Marca | null> {
        const res = await database.executeQuery(`
            select * from Marca where idMarca = ${id}
        `)

        if (!res)
            return null

        return res[0] as Marca
    }



    async findAll(): Promise<Marca[]> {
        const res = await database.executeQuery(`select * from Marca`)

        if (!res)
            return []

        return res as Marca[]
    }

    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Marca where idMarca = ${id}
        `)
    }

    async update(obj: Marca): Promise<Marca> {
        await database.executeQuery(`
        update Marca
        set 
        nombreMarca='${obj.nombreMarca}'
        where idMarca = ${obj.idMarca}
    `)

        return obj
    }
}




export const alimentosRepository = new AlimentosRepository()
export const tipoAlimentoRepository = new TipoAlimentoRepository()
export const marcaRepository = new MarcaRepository()
