import { alimentosRepository } from './../../persistence/repositories/alimentosRepository';
import { pedidosRepository, pedidoAlimentoRepository } from './../../persistence/repositories/pedidosRepository';

import { Pedido, PedidoAlimento, PrivilegiosId } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';

class PedidosController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/", this.verifyToken, (req, res) => { this.getPedidos(req as CustomRequest, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.getPedido(req as CustomRequest, res) })
        this.router.post("/", this.verifyToken, (req, res) => { this.createPedido(req as CustomRequest, res) })
        this.router.put("/", this.verifyToken, (req, res) => { this.editPedido(req as CustomRequest, res) })
        this.router.delete("/:id", this.verifyToken, (req, res) => { this.deletePedido(req as CustomRequest, res) })

    }

    //----------------------------------------PEDIDOS-----------------------------------------------------------

    async getPedidos(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedidos = await pedidosRepository.findAll()

            res.status(200).json(pedidos)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async getPedido(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const idPedido = Number.parseInt(req.params.id)
            const pedido = await pedidosRepository.get(idPedido)

            if (!pedido)
                return res.sendStatus(404)

            const pedidosAlimento = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(idPedido)

            for (let pedido of pedidosAlimento) {

                const alimento = await alimentosRepository.get(pedido.idAlimento)
                if (alimento)
                    pedido.alimento = alimento
            }

            pedido.alimentos = pedidosAlimento

            res.status(200).json(pedido)

        } catch (error) {
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

            const nuevoPedido = await pedidosRepository.add(pedido)

            for (let alimento of pedido.alimentos) {
                alimento.idPedido = nuevoPedido.idPedido
                await pedidoAlimentoRepository.add(alimento)
            }

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

            const pedidosAlimentos = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(deleteId)

            for (let pedidoAlimento of pedidosAlimentos) {

                await pedidoAlimentoRepository.delete(pedidoAlimento.idPedido, pedidoAlimento.idAlimento)

            }

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

    // //------------------------------------------PEDIDO ALIMENTO---------------------------------------------

    // async getPedidosAlimentos(req: Request, res: Response) {
    //     try {

       //     res.status(200).json(pedidosAlimentos)


    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)
    //     }
    // }

    // async getPedidoAlimento(req: CustomRequest, res: Response) {
    //     try {
    //         const idPedido = Number.parseInt(req.params.id)
    //         const pedido = await pedidosRepository.get(idPedido)

    //         if (!pedido)
    //             return res.sendStatus(404)

    //         res.status(200).json(pedido)

    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)
    //     }
    // }

    // async createPedidoAlimento(req: CustomRequest, res: Response) {
    //     try {
    //         const id = req.idEmpleado
    //         const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

    //         if (!hasPermission)
    //             return res.sendStatus(403)

    //         const pedido = req.body as Pedido

    //         await pedidosRepository.add(pedido)

    //         res.status(200).json(pedido)

    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)
    //     }
    // }


    // async deletePedidoAlimento(req: CustomRequest, res: Response) {
    //     try {

    //         const id = req.idEmpleado
    //         const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

    //         if (!hasPermission)
    //             return res.sendStatus(403)

    //         const deleteId = Number.parseInt(req.params.id)

    //         await pedidosRepository.delete(deleteId);

    //         res.status(200).json()


    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)

    //     }
    // }

    // async editPedidoAlimento(req: CustomRequest, res: Response) {
    //     try {

    //         const id = req.idEmpleado
    //         const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

    //         if (!hasPermission)
    //             return res.sendStatus(403)

    //         const pedido = req.body as Pedido

    //         await pedidosRepository.update(pedido);

    //         res.status(200).json()


    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)

    //     }
    // }

}

export const pedidosController = new PedidosController()