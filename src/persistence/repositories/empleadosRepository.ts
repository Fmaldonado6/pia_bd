import { database } from './../database';
import { Empleado } from './../../models/models';
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
            ${obj.nombre},${obj.telefono},${obj.contrasena},${obj.fechaNacimiento},
            ${obj.idTipoEmpleado},${obj.numero}
        )`)
    }
    async get(id: string): Promise<Empleado> {
        throw new Error('Method not implemented.');
    }
    async findAll(): Promise<Empleado[]> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async update(obj: Empleado): Promise<Empleado> {
        throw new Error('Method not implemented.');
    }
}


export const empleadosRepository = new EmpleadosRepository()