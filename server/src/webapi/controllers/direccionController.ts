import { paisRepository, estadoRepository, municipioRepository, coloniasRepository, callesRepository } from './../../persistence/repositories/direcionRepository';
import { Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
class DirectionController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.get("/pais", this.verifyToken, (req, res) => { this.getPaises(req as CustomRequest, res) })
        this.router.get("/estados/:id", this.verifyToken, (req, res) => { this.getEstadosByPaisId(req as CustomRequest, res) })
        this.router.get("/colonias/:id", this.verifyToken, (req, res) => { this.getColoniaById(req as CustomRequest, res) })
        this.router.get("/calles/:id", this.verifyToken, (req, res) => { this.getCalleBydId(req as CustomRequest, res) })
        this.router.get("/municipios/:id", this.verifyToken, (req, res) => { this.getMunicipiosByEstadoId(req as CustomRequest, res) })
    }
    async getPaises(req: CustomRequest, res: Response) {
        try {

            const paises = await paisRepository.findAll()

            res.status(200).json(paises)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getColoniaById(req: CustomRequest, res: Response) {
        try {

            const id = Number.parseInt(req.params.id)
            const colonia = await coloniasRepository.get(id)

            if (!colonia)
                return res.sendStatus(404)

            res.status(200).json(colonia)


        } catch (error) {
        }
    }

    async getCalleBydId(req: CustomRequest, res: Response) {
        try {

            const id = Number.parseInt(req.params.id)
            const calle = await callesRepository.get(id)

            if (!calle)
                return res.sendStatus(404)

            res.status(200).json(calle)


        } catch (error) {

        }
    }

    async getEstadosByPaisId(req: CustomRequest, res: Response) {
        try {
            const id = Number.parseInt(req.params.id)

            const estados = await estadoRepository.getEstadosByPaisId(id)

            res.status(200).json(estados)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getMunicipiosByEstadoId(req: CustomRequest, res: Response) {
        try {

            const id = Number.parseInt(req.params.id)

            const municipios = await municipioRepository.getMunicipiosByEstadoId(id)

            res.status(200).json(municipios)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

}

export const direccionController = new DirectionController()