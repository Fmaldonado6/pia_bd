import { database } from './../database';
import { Empleado, Privilegios, TipoEmpleado } from './../../models/models';
import { BaseRepository } from './baseRepository';
class EmpleadosRepository implements BaseRepository<Empleado> {

    async add(obj: Empleado): Promise<void> {
        await database.executeQuery(`
        insert into Empleado(
            idPais,idEstado,idMunicipio,idColonia,idCalle
            nombre,telefono,contrasena,fechaNacimiento,
            idTipoEmpleado,numero
        ) values (
            ${obj.idPais},${obj.idEstado},${obj.idMunicipio},${obj.idColonia},${obj.idCalle},
            '${obj.nombre}',${obj.telefono},'${obj.contrasena}',${obj.fechaNacimiento},
            ${obj.idTipoEmpleado},${obj.numero}
        )`)
    }

    async addAdmin(obj: TipoEmpleado): Promise<void> {
        await database.executeQuery(`
        SET IDENTITY_INSERT Empleado ON

        insert into Empleado(
            idEmpleado,nombre,contrasena,idTipoEmpleado
        ) values (
            1000,1,19,971
        )
        SET IDENTITY_INSERT Empleado ON
        
        `)
    }

    async get(id: string): Promise<Empleado | null> {
        const res = await database.executeQuery(`
            select * from Empleado where idEmpleado = ${id}
        `)

        if (!res)
            return null

        return res[0] as Empleado

    }
    async findAll(): Promise<Empleado[]> {
        const res = await database.executeQuery(`select * from Empleado`)

        if (!res)
            return []

        return res
    }
    async delete(id: string): Promise<void> {
        await database.executeQuery(`
            delete from Empleado where idEmpleado = ${id}
        `)
    }

    async update(obj: Empleado): Promise<Empleado> {
        await database.executeQuery(`
        update Empleado
            set idPais=${obj.idPais},idEstado = ${obj.idEstado},idMunicipio = ${obj.idMunicipio},idColonia = ${obj.idColonia},idCalle = ${obj.idCalle},
            nombre = '${obj.nombre}',telefono = ${obj.telefono},contrasena = '${obj.contrasena}',fechaNacimiento = ${obj.fechaNacimiento},
            numero = ${obj.numero}
        where idEmpleado = ${obj.idEmpleado}
        
        `)

        return obj
    }
}


class TipoEmpleadoRepository implements BaseRepository<TipoEmpleado> {

    async add(obj: TipoEmpleado): Promise<void> {
        await database.executeQuery(`
        insert into TipoEmpleado(
            sueldo,nombreTipoEmpleado,horaEntrada,horaSalida
        ) values (
            ${obj.sueldo},'${obj.nombreTipoEmpleado}',${obj.horaEntrada},${obj.horaSalida}
        )`)
    }




    async get(id: string): Promise<TipoEmpleado | null> {
        const res = await database.executeQuery(`
            select * from TipoEmpleado where idTipoEmpleado = ${id}
        `)

        if (!res)
            return null

        return res[0] as TipoEmpleado
    }

    async getTipoEmpleadosByPrivilegiosId(privilegioId: string): Promise<TipoEmpleado[]> {

        const res = await database.executeQuery(`
            select * from EmpPrivilegios join TipoEmpleado on EmpPrivilegios.idPrivilegio = ${privilegioId} 
            and TipoEmpleado.idTipoEmpleado = EmpPrivilegios.idTipoEmpleado
        `)
        if (!res)
            return []

        return res
    }

    async findAll(): Promise<TipoEmpleado[]> {
        const res = await database.executeQuery(`select * from TipoEmpleado`)

        if (!res)
            return []

        return res as TipoEmpleado[]
    }

    async delete(id: string): Promise<void> {
        await database.executeQuery(`
            delete from TipoEmpleado where idTipoEmpleado = ${id}
        `)
    }

    async update(obj: TipoEmpleado): Promise<TipoEmpleado> {
        await database.executeQuery(`
        update TipoEmpleado
        set sueldo = ${obj.sueldo},
        nombreTipoEmpleado = '${obj.nombreTipoEmpleado}',
        horaEntrada = '${obj.horaEntrada}',
        horaSalida = '${obj.horaSalida}'
        where idTipoEmpleado = ${obj.idTipoEmpleado}
    `)

        return obj
    }
}

class PrivilegiosRepository implements BaseRepository<Privilegios>{

    async add(obj: Privilegios): Promise<void> {
        await database.executeQuery(`
            insert into privilegios(nombre)
            values('${obj.nombre}')
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
    async update(obj: Privilegios): Promise<Privilegios> {
        await database.executeQuery(`
        update Privilegios
        set nombre = ${obj.nombre},
        where idPrivilegio = ${obj.idPrivilegio}
    `)

        return obj
    }
    async delete(id: string): Promise<void> {
        await database.executeQuery(`
            delete from Privilegios where idPrivilegio = ${id}
        `)
    }

}


export const privilegiosRepository = new PrivilegiosRepository()
export const empleadosRepository = new EmpleadosRepository()
export const tipoEmpleadoRepository = new TipoEmpleadoRepository()