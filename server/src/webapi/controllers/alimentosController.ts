import { alimentosController } from './alimentosController';
import { alimentosRepository, tipoAlimentoRepository} from './../../persistence/repositories/alimentosRepository';
import { Alimentos, PrivilegiosId } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { empleadosRepository, privilegiosRepository } from '../../persistence/repositories/empleadosRepository';
class AlimentosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/", this.verifyToken, (req, res) => { this.getAlimentos(req, res) })
        this.router.get("/", this.verifyToken, (req, res) => { this.createAlimento(req as CustomRequest, res) })
        this.router.get("/", this.verifyToken, (req, res) => { this.editAlimento(req as CustomRequest, res) })
        this.router.get("/tipos", this.verifyToken, (req, res) => { this.getTipoAlimentos(req, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.getAlimento(req as CustomRequest, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.deleteAlimento(req as CustomRequest, res) })

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

    async getAlimento(req: CustomRequest, res: Response){
        try{
            const idAlimento = Number.parseInt(req.params.id)
            const alimento = await alimentosRepository.get(idAlimento)

            if(!alimento)
            return res.sendStatus(404)

            res.status(200).json(alimento)
            
        }catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async createAlimento(req: CustomRequest, res: Response) {
        try {
            const id = req.idEmpleado
            const userInfo = await empleadosRepository.get(id)

            if (!userInfo)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(userInfo.idTipoEmpleado)

            let accepted = false

            for (let privilegio of privilegios) {

                if (privilegio.idPrivilegio == PrivilegiosId.crearAlimentos)
                    accepted = true

            }

            if (!accepted)
                return res.sendStatus(403)

            const alimento = req.body as Alimentos

            await alimentosRepository.add(alimento)

            res.status(200).json(alimento)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getTipoAlimentos(req: Request, res: Response) {
        try {
            const tipos = await tipoAlimentoRepository.findAll()

            res.status(200).json(tipos)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }

    }

    async deleteAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)

            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.borrarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const deleteId = Number.parseInt(req.params.id)

            await alimentosRepository.delete(deleteId);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
    
    async editAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)
            
            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.editarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const alimento = req.body as Alimentos    

            await alimentosRepository.update(alimento);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }


}

export const alimentosController = new AlimentosController()