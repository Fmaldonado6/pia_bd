import { Request, Response } from 'express';
import { Empleado } from '../../models/models';
import { empleadosRepository } from './../../persistence/repositories/empleadosRepository';
import { BaseController } from './baseController';
class EmpleadosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.post("/", (req, res) => { this.createEmpleado(req, res) })

    }

    async createEmpleado(req: Request, res: Response) {
        try {

            const empleado = req.body as Empleado

            await empleadosRepository.add(empleado)

            res.status(200).json(empleado)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


}
