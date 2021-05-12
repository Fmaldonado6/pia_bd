import { database } from './../database';
import { Privilegios } from '../../models/models';
import { BaseRepository } from './baseRepository';
class PrivilegiosRepository implements BaseRepository<Privilegios>{

    async add(obj: Privilegios): Promise<void> {
        await database.executeQuery(`
            insert into privilegios(nombre),
            values(${obj.nombre})
        `)
    }
    async get(id: string): Promise<Privilegios | null> {
        const res = await database.executeQuery(`
            select * from Privilegios where
            idPrivilegio = ${id}
        `)

        if (!res)
            return null

        return res[0] as Privilegios
    }
    async findAll(): Promise<Privilegios[]> {
        const res = await database.executeQuery(`select * from Privilegios`)

        if (!res)
            return []

        return res
    }
    update(obj: Privilegios): Promise<Privilegios> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<Privilegios> {
        throw new Error('Method not implemented.');
    }

}