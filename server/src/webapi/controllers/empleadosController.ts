import { Request, Response } from 'express';
import { Empleado } from '../../models/models';
import { empleadosRepository, tipoEmpleadoRepository } from './../../persistence/repositories/empleadosRepository';
import { BaseController, CustomRequest } from './baseController';
class EmpleadosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.post("/", (req, res) => { this.createEmpleado(req, res) })
        this.router.get("/info", this.verifyToken, (req, res) => { this.getMyInfo(req as CustomRequest, res) })
        this.router.get("/tipos", this.verifyToken, (req, res) => { this.getTipoEmpleados(req as CustomRequest, res) })


    }

    async getMyInfo(req: CustomRequest, res: Response) {
        try {

            const idEmpleado = req.idEmpleado

            const empleado = await empleadosRepository.get(idEmpleado)

            if (!empleado)
                return res.sendStatus(404)

            if (empleado) empleado.contrasena = ""

            res.status(200).json(empleado)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
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

    async getTipoEmpleados(req: Request, res: Response) {
        try {

            const tipos = await tipoEmpleadoRepository.findAll()

            res.status(200).json(tipos)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }

    }

}

export const empleadosController = new EmpleadosController()
