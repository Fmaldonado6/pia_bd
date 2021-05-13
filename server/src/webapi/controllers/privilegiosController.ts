import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { Privilegios } from '../../models/models';
import { privilegiosRepository } from '../../persistence/repositories/empleadosRepository';
class PrivilegiosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.get("/", (req, res) => { this.getPrivilegios(req, res) })
        this.router.post("/", (req, res) => { this.addPrivilegio(req, res) })
        this.router.delete("/:id", (req, res) => { this.deletePrivilegio(req, res) })

    }

    async getPrivilegios(req: Request, res: Response) {
        try {
            const privilegios = await privilegiosRepository.findAll()

            res.status(200).json(privilegios)

        } catch (error) {

        }
    }

    async addPrivilegio(req: Request, res: Response) {
        try {
            const privilegio = Object.assign(new Privilegios(), req.body)

            await privilegiosRepository.add(privilegio)

            res.sendStatus(200)

        } catch (error) {
            console.log(error)
            res.sendStatus(500)


        }
    }

    async deletePrivilegio(req: Request, res: Response) {
        try {
            const id = Number.parseInt(req.params.id)

            await privilegiosRepository.delete(id)

            res.sendStatus(200)

        } catch (error) {
            console.log(error)
            res.sendStatus(500)


        }
    }

}

export const privilegiosController = new PrivilegiosController()