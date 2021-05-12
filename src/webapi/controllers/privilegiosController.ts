import { privilegiosRepository } from './../../persistence/repositories/privilegiosRepository';
import { Request, Response } from 'express';
import { BaseController } from './baseController';
class PrivilegiosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.get("/", (req, res) => { this.getPrivilegios(req, res) })
    }

    async getPrivilegios(req: Request, res: Response) {
        try {
            const privilegios = await privilegiosRepository.findAll()

            res.status(200).json(privilegios)

        } catch (error) {

        }
    }

}

export const privilegiosController = new PrivilegiosController()