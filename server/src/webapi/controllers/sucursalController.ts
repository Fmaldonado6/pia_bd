import { InfoSucursalResource } from './../../models/models';
import { infoSucursalRepository } from './../../persistence/repositories/infoSucursalRepository';
import { Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { paisRepository, estadoRepository, municipioRepository, coloniasRepository, callesRepository } from '../../persistence/repositories/direcionRepository';
class SucursalController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.get("/", this.verifyToken, (req, res) => { this.getInfo(req as CustomRequest, res) })
    }

    async getInfo(req: CustomRequest, res: Response) {
        try {

            const info = await infoSucursalRepository.get() as InfoSucursalResource

            const pais = await paisRepository.get(info.idPais)
            const estado = await estadoRepository.get(info.idEstado)
            const municipio = await municipioRepository.get(info.idMunicipio)
            const colonia = await coloniasRepository.get(info.idColonia)
            const calle = await callesRepository.get(info.idCalle)

            if (pais) info.nombrePais = pais?.nombre
            if (estado) info.nombreEstado = estado?.nombre
            if (municipio) info.nombreMunicipio = municipio?.nombre
            if (colonia) info.nombreColonia = colonia?.nombre
            if (calle) info.nombreCalle = calle.nombre

            res.status(200).json(info)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

}

export const sucursalController = new SucursalController()