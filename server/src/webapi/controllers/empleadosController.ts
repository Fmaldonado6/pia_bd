import { coloniasRepository, callesRepository } from './../../persistence/repositories/direcionRepository';
import { PrivilegiosId, Colonia, Calle } from './../../models/models';
import { Request, Response } from 'express';
import { Empleado } from '../../models/models';
import { empleadosRepository, tipoEmpleadoRepository, privilegiosRepository } from './../../persistence/repositories/empleadosRepository';
import { BaseController, CustomRequest } from './baseController';
class EmpleadosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.post("/", this.verifyToken, (req, res) => { this.createEmpleado(req as CustomRequest, res) })
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

    async createEmpleado(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const userInfo = await empleadosRepository.get(id)

            if (!userInfo)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(userInfo.idTipoEmpleado)

            let accepted = false

            for (let privilegio of privilegios) {

                if (privilegio.idPrivilegio == PrivilegiosId.crearUsuarios)
                    accepted = true

            }

            if (!accepted)
                return res.sendStatus(403)

            const empleado = req.body as Empleado

            let colonia = await coloniasRepository.getColoniaByName(empleado.nombreColonia)

            if (!colonia) {
                colonia = new Colonia()
                colonia.idMunicipio = empleado.idMunicipio
                colonia.nombre = empleado.nombreColonia
                colonia = await coloniasRepository.add(colonia)
            }

            let calle = await callesRepository.getCallesByName(empleado.nombreColonia)


            if (!calle) {
                calle = new Calle()
                calle.idColonia = colonia.idColonia
                calle.nombre = empleado.nombreCalle
                calle = await callesRepository.add(calle)
            }


            empleado.idColonia = colonia.idColonia
            empleado.idCalle = calle.idCalle

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
