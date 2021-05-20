import { alimentosRepository, tipoAlimentoRepository, marcaRepository} from './../../persistence/repositories/alimentosRepository';
import { Alimentos, Marca, PrivilegiosId, TipoAlimento } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { empleadosRepository, privilegiosRepository } from '../../persistence/repositories/empleadosRepository';
class AlimentosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/alimentos", this.verifyToken, (req, res) => { this.getAlimentos(req, res) })
        this.router.get("/alimentos/:id", this.verifyToken, (req, res) => { this.getAlimento(req, res) })
        this.router.post("/alimentos/create", this.verifyToken, (req, res) => { this.createAlimento(req as CustomRequest, res) })
        this.router.put("/alimentos/edit", this.verifyToken, (req, res) => { this.editAlimento(req as CustomRequest, res) })
        this.router.delete("/alimentos/:id", this.verifyToken, (req, res) => { this.deleteAlimento(req as CustomRequest, res) })
        
        this.router.get("/tipo_alimento", this.verifyToken, (req, res) => { this.getTiposAlimentos(req, res) })
        this.router.get("/tipo_alimento/:id", this.verifyToken, (req, res) => { this.getTipoAlimento(req, res) })
        this.router.post("/tipo_alimento/create", this.verifyToken, (req, res) =>{ this.createTipoAlimento(req as CustomRequest, res)})
        this.router.put("/tipo_alimento/edit", this.verifyToken, (req, res) => { this.editTipoAlimento(req as CustomRequest, res)})
        this.router.delete("/tipo_alimento/:id", this.verifyToken, (req, res) => { this.deleteTipoAlimento(req as CustomRequest, res)})

        this.router.post("/marcas", this.verifyToken, (req, res) => { this.getMarcas(req, res)})
        this.router.get("/marcas/:id", this.verifyToken, (req, res) => { this.getMarca(req, res) })
        this.router.post("/marcas/create", this.verifyToken, (req, res) => { this.createMarca(req as CustomRequest, res) })
        this.router.put("/marcas/edit", this.verifyToken, (req, res) => { this.editMarca(req as CustomRequest, res) })
        this.router.delete("/marcas/:id", this.verifyToken, (req, res) => { this.deleteMarca(req as CustomRequest, res) })
    }

    //ALIMENTOS

    async getAlimentos(req: Request, res: Response) {
        try {
            const alimentos = await alimentosRepository.findAll()

            res.status(200).json(alimentos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getAlimento(req: Request, res: Response){
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

                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos)
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


    async deleteAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)

            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
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
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
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

    //TIPO ALIMENTO

    async getTiposAlimentos(req: Request, res: Response) {
        try {
            const tipos = await tipoAlimentoRepository.findAll()

            res.status(200).json(tipos)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }

    }

    async getTipoAlimento(req: Request, res: Response){
        try {
            const idTipoAlimento = Number.parseInt(req.params.id)
            const tipoAlimento = await tipoAlimentoRepository.get(idTipoAlimento);

            if(!tipoAlimento)
            return res.sendStatus(404)

            res.status(200).json(tipoAlimento)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
            
        }
    }

    async createTipoAlimento(req: CustomRequest, res: Response){
        try {
            const id = req.idEmpleado
            const userInfo = await empleadosRepository.get(id)

            if (!userInfo)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(userInfo.idTipoEmpleado)

            let accepted = false

            for (let privilegio of privilegios) {

                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos)
                    accepted = true

            }

            if (!accepted)
                return res.sendStatus(403)

            const tipoAlimento = req.body as TipoAlimento

            await tipoAlimentoRepository.add(tipoAlimento)

            res.status(200).json(tipoAlimento)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async deleteTipoAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)

            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const deleteId = Number.parseInt(req.params.id)

            await tipoAlimentoRepository.delete(deleteId);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

    async editTipoAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)
            
            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const tipoAlimento = req.body as TipoAlimento    

            await tipoAlimentoRepository.update(tipoAlimento);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }


    //MARCAS

    async getMarcas(req: Request, res: Response) {
        try {
            const marcas = await marcaRepository.findAll()

            res.status(200).json(marcas)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getMarca(req: Request, res: Response){
        try{
            const idMarca = Number.parseInt(req.params.id)
            const marca = await marcaRepository.get(idMarca)

            if(!marca)
            return res.sendStatus(404)

            res.status(200).json(marca)
            
        }catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async createMarca(req: CustomRequest, res: Response) {
        try {
            const id = req.idEmpleado
            const userInfo = await empleadosRepository.get(id)

            if (!userInfo)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(userInfo.idTipoEmpleado)

            let accepted = false

            for (let privilegio of privilegios) {

                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos)
                    accepted = true

            }

            if (!accepted)
                return res.sendStatus(403)

            const marca = req.body as Marca

            await marcaRepository.add(marca)

            res.status(200).json(marca)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async deleteMarca(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)

            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const deleteId = Number.parseInt(req.params.id)

            await marcaRepository.delete(deleteId);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
    
    async editMarca(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const empleado = await empleadosRepository.get(id)
            
            if (!empleado)
                return res.sendStatus(403)

            const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

            let found = false

            for (let privilegio of privilegios) {
                if (privilegio.idPrivilegio == PrivilegiosId.gestionarAlimentos) {
                    found = true
                    break
                }
            }

            if (!found)
                return res.sendStatus(403)

            const marca = req.body as Marca    

            await marcaRepository.update(marca);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

}

export const alimentosController = new AlimentosController()