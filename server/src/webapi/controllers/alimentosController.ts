import { alimentosRepository } from './../../persistence/repositories/alimentosRepository';
import { Request, Response } from 'express';
import { BaseController } from './baseController';
class AlimentosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/", this.verifyToken, (req, res) => { this.getAlimentos(req, res) })

    }

    async getAlimentos(req: Request, res: Response) {
        try {
            const alimentos = await alimentosRepository.findAll()

            res.status(200).json(alimentos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

}

export const alimentosController = new AlimentosController()