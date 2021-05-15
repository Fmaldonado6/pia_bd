import { Calle, Colonia, Estado, Municipio } from './../../models/models';
import { database } from './../database';
import { Pais } from '../../models/models';
import { BaseRepository } from './baseRepository';
class PaisRepository implements BaseRepository<Pais>{
    async add(obj: Pais): Promise<Pais> {
        const res = await database.executeQuery(`
            insert into Pais(nombre) 
            output Inserted.idPais
            values('${obj.nombre}')
        `)

        return res!![0]
    }
    async get(id: number): Promise<Pais | null> {
        const res = await database.executeQuery(`
            select * from Pais where idPais = ${id}
        `)

        if (!res)
            return null

        return res[0] as Pais
    }
    async findAll(): Promise<Pais[]> {
        const res = await database.executeQuery(`select * from Pais`)
        if (!res)
            return []

        return res
    }
    async update(obj: Pais): Promise<Pais> {
        await database.executeQuery(`
            update Pais
            set nombre = '${obj.nombre}'
            where idPais = ${obj.idPais}
        `)

        return obj
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Pais where idPais = ${id}
        `)
    }

}

class EstadoRepository implements BaseRepository<Estado>{
    async add(obj: Pais): Promise<Estado> {
        const res = await database.executeQuery(`
            insert into Estado(nombre,idPais) 
            output Inserted.idEstado
            values('${obj.nombre}','${obj.idPais}')
        `)

        return res!![0]
    }
    async get(id: number): Promise<Estado | null> {
        const res = await database.executeQuery(`
            select * from Estado where idEstado = ${id}
        `)

        if (!res)
            return null

        return res[0] as Estado
    }

    async getEstadosByPaisId(id: number): Promise<Estado[]> {
        const res = await database.executeQuery(`
            select * from Estado where idPais = ${id}
        `)

        if (!res)
            return []

        return res
    }

    async findAll(): Promise<Estado[]> {
        const res = await database.executeQuery(`select * from Estado`)
        if (!res)
            return []

        return res
    }
    async update(obj: Estado): Promise<Estado> {
        await database.executeQuery(`
            update Estado
            set nombre = '${obj.nombre}'
            where idEstado = ${obj.idEstado}
        `)

        return obj
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Estado where idEstado = ${id}
        `)
    }

}

class MunicipioRepository implements BaseRepository<Municipio>{
    async add(obj: Municipio): Promise<Municipio> {
        const res = await database.executeQuery(`
            insert into Municipio(nombre,idEstado) 
            output Inserted.idMunicipio
            values('${obj.nombre}','${obj.idEstado}')
        `)

        return res!![0]
    }
    async get(id: number): Promise<Municipio | null> {
        const res = await database.executeQuery(`
            select * from Municipio where idMunicipio = ${id}
        `)

        if (!res)
            return null

        return res[0] as Municipio
    }

    async getMunicipiosByEstadoId(id: number): Promise<Municipio[]> {
        const res = await database.executeQuery(`
            select * from Municipio where idEstado = ${id}
        `)


        if (!res)
            return []

        return res
    }

    async findAll(): Promise<Municipio[]> {
        const res = await database.executeQuery(`select * from Municipio`)
        if (!res)
            return []

        return res
    }
    async update(obj: Municipio): Promise<Municipio> {
        await database.executeQuery(`
            update Municipio
            set nombre = '${obj.nombre}'
            where idMunicipio = ${obj.idEstado}
        `)

        return obj
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Municipio where idMunicipio = ${id}
        `)
    }

}

class ColoniaRepository implements BaseRepository<Colonia>{
    async add(obj: Colonia): Promise<Colonia> {
        const res = await database.executeQuery(`
            insert into Colonia(nombre,idMunicipio) output Inserted.idColonia values('${obj.nombre}','${obj.idMunicipio}')
        `)

        return res!![0]

    }

    async get(id: number): Promise<Colonia | null> {
        const res = await database.executeQuery(`
            select * from Colonia where idColonia = ${id}
        `)

        if (!res)
            return null

        return res[0] as Colonia
    }

    async getColoniasByMunicipioId(id: number): Promise<Colonia[]> {
        const res = await database.executeQuery(`
            select * from Colonia where idMunicipio = ${id}
        `)

        if (!res)
            return []

        return res
    }

    async getColoniaByName(name: string): Promise<Colonia | null> {
        const res = await database.executeQuery(`
        select * from Colonia where nombre = '${name}'
    `)

        if (!res)
            return null

        return res[0]
    }

    async findAll(): Promise<Colonia[]> {
        const res = await database.executeQuery(`select * from Colonia`)
        if (!res)
            return []

        return res
    }
    async update(obj: Colonia): Promise<Colonia> {
        await database.executeQuery(`
            update Colonia
            set nombre = '${obj.nombre}'
            where idColonia = ${obj.idColonia}
        `)

        return obj
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Colonia where idColonia = ${id}
        `)
    }

}

class CallesRepository implements BaseRepository<Calle>{
    async add(obj: Calle): Promise<Calle> {
        const res = await database.executeQuery(`
            insert into Calle(nombre,idColonia) 
            output Inserted.idCalle
            values('${obj.nombre}','${obj.idColonia}')
        `)

        return res!![0]
    }
    async get(id: number): Promise<Calle | null> {
        const res = await database.executeQuery(`
            select * from Calle where idCalle = ${id}
        `)

        if (!res)
            return null

        return res[0] as Calle
    }

    async getCallesByColoniaId(id: number): Promise<Calle[]> {
        const res = await database.executeQuery(`
            select * from Calle where idColonia = ${id}
        `)

        if (!res)
            return []

        return res
    }


    async getCallesByName(name: string): Promise<Calle | null> {
        const res = await database.executeQuery(`
        select * from Calle where nombre = '${name}'
    `)

        if (!res)
            return null

        return res[0]
    }

    async findAll(): Promise<Calle[]> {
        const res = await database.executeQuery(`select * from Calle`)
        if (!res)
            return []

        return res
    }
    async update(obj: Calle): Promise<Calle> {
        await database.executeQuery(`
            update Calle
            set nombre = '${obj.nombre}'
            where idCalle = ${obj.idCalle}
        `)

        return obj
    }
    async delete(id: number): Promise<void> {
        await database.executeQuery(`
            delete from Calle where idCalle = ${id}
        `)
    }

}

export const paisRepository = new PaisRepository()
export const estadoRepository = new EstadoRepository()
export const municipioRepository = new MunicipioRepository()
export const coloniasRepository = new ColoniaRepository()
export const callesRepository = new CallesRepository()