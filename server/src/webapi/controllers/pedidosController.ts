import { pedidosRepository, pedidoAlimentoRepository} from './../../persistence/repositories/pedidosRepository';
import { Pedido, PedidoAlimento, PrivilegiosId } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { alimentosRepository } from '../../persistence/repositories/alimentosRepository';

class PedidosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/", this.verifyToken, (req, res) => { this.getPedidos(req, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.getPedido(req, res) })
        this.router.post("/create", this.verifyToken, (req, res) => { this.createPedido(req as CustomRequest, res) })
        this.router.put("/edit", this.verifyToken, (req, res) => { this.editPedido(req as CustomRequest, res) })
        this.router.delete("/:id", this.verifyToken, (req, res) => { this.deletePedido(req as CustomRequest, res) })

        this.router.get("/pedido_alimento/:id", this.verifyToken, (req, res) => { this.getPedidosAlimentos(req, res) })
        this.router.post("/pedido_alimento/create", this.verifyToken, (req, res) => { this.createPedidoAlimentos(req as CustomRequest, res) })
        this.router.put("/pedido_alimento/edit", this.verifyToken, (req, res) => { this.editPedidoAlimento(req as CustomRequest, res) })
        this.router.delete("/pedido_alimento/:idPedido/:idAlimento", this.verifyToken, (req, res) => { this.deletePedidoAlimento(req as CustomRequest, res) })
    }

    //----------------------------------------PEDIDOS-----------------------------------------------------------

    async getPedidos(req: Request, res: Response) {
        try {
            const pedidos = await pedidosRepository.findAll()

            res.status(200).json(pedidos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getPedido(req: Request, res: Response){
        try{
            const idPedido = Number.parseInt(req.params.id)
            const pedido = await pedidosRepository.get(idPedido)

            if(!pedido)
            return res.sendStatus(404)

            res.status(200).json(pedido)
            
        }catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async createPedido(req: CustomRequest, res: Response) {
        try {
            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedido = req.body as Pedido

            await pedidosRepository.add(pedido)

            res.status(200).json(pedido)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async deletePedido(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const deleteId = Number.parseInt(req.params.id)

            await pedidosRepository.delete(deleteId);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
    
    async editPedido(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedido = req.body as Pedido    

            await pedidosRepository.update(pedido);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

    //------------------------------------------PEDIDO ALIMENTO---------------------------------------------

    async getPedidosAlimentos(req: Request, res: Response) {
        try {
            const idPedido = Number.parseInt(req.params.id)

            const pedidosAlimentos = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(idPedido)

            for (let detalle of pedidosAlimentos){
                const alimento = await alimentosRepository.get(detalle.idAlimento)
                if(alimento)
                detalle.alimento = alimento
            }

            res.status(200).json(pedidosAlimentos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }



    async createPedidoAlimentos(req: CustomRequest, res: Response) {
        try {
            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedidoAlimentos = req.body as PedidoAlimento[]

            await pedidoAlimentoRepository.addAllPedidoAlimento(pedidoAlimentos)

            res.status(200).json(pedidoAlimentos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async deletePedidoAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const idPedido = Number.parseInt(req.params.idPedido)
            const idAlimento = Number.parseInt(req.params.idAlimento)

            await pedidoAlimentoRepository.delete(idPedido,idAlimento);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
    
    async editPedidoAlimento(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedidoAlimento = req.body as PedidoAlimento   

            await pedidoAlimentoRepository.update(pedidoAlimento);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

}

export const pedidosController = new PedidosController()