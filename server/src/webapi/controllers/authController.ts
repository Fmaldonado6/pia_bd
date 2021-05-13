import { empleadosRepository } from './../../persistence/repositories/empleadosRepository';
import { Empleado } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController } from './baseController';
import jwt from 'jsonwebtoken'
class AuthController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.post("/", (req, res) => { this.login(req, res) })
    }


    async login(req: Request, res: Response) {
        try {

            const empleado = req.body as Empleado
            const savedEmpleado = await empleadosRepository.get(empleado.idEmpleado)

            if (!savedEmpleado)
                return res.sendStatus(404)

            if (empleado.contrasena != savedEmpleado?.contrasena)
                return res.sendStatus(403)


            let token = jwt.sign(
                {
                    idEmpleado: empleado.idEmpleado,
                },
                'chunchunmaru')

            return res.status(200).json(token)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


}

export const authController = new AuthController()