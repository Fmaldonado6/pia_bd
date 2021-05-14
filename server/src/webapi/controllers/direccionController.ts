import { paisRepository, estadoRepository, municipioRepository } from './../../persistence/repositories/direcionRepository';
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