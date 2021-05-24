import { InfoSucursal } from '../../models/models';
import { database } from './../database';
export class InfoSucursalRepository {

    async get(): Promise<InfoSucursal | null> {
        const res = await database.executeQuery(`select * from InfoNegocio`)

        if (!res)
            return null

        return res[0]
    }

}

export const infoSucursalRepository = new InfoSucursalRepository()