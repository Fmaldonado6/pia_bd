import { alimentosRepository } from './../../persistence/repositories/alimentosRepository';
import { pedidosRepository, pedidoAlimentoRepository } from './../../persistence/repositories/pedidosRepository';

import { Pedido, PrivilegiosId } from './../../models/models';
import { Response } from 'express';
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

            pedidos.forEach(e => {
                e.fechaPedido = new Date(e.fechaPedido as any)
            })

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

            for (let pedidoAlimento of pedidosAlimento) {

                const alimento = await alimentosRepository.get(pedidoAlimento.idAlimento)
                if (alimento)
                    pedidoAlimento.alimento = alimento
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

            const pedido = Object.assign(new Pedido(), req.body as Pedido)

            pedido.fechaPedido = new Date()

            const nuevoPedido = await pedidosRepository.add(pedido)

            for (let alimento of pedido.alimentos) {
                alimento.idPedido = nuevoPedido.idPedido
                await pedidoAlimentoRepository.add(alimento)
            }

            res.status(200).json(nuevoPedido)

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

            const alimentos = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(pedido.idPedido)


            for (let alimento of pedido.alimentos) {

                const found = alimentos.find(x => x.idAlimento == alimento.idAlimento)

                if (found) {

                    const quantity = alimento.cantidad - found.cantidad

                    await alimentosRepository.addAlimentoQuantityById(alimento.idAlimento, -quantity)

                    await pedidoAlimentoRepository.update(alimento)
                }
                else {

                    await alimentosRepository.addAlimentoQuantityById(alimento.idAlimento, -alimento.cantidad)

                    await pedidoAlimentoRepository.add(alimento)
                }
            }

            for (let alimento of alimentos) {

                const found = pedido.alimentos.find(x => x.idAlimento == alimento.idAlimento)

                if (!found) {
                    await alimentosRepository.addAlimentoQuantityById(alimento.idAlimento, alimento.cantidad)

                    await pedidoAlimentoRepository.delete(alimento.idPedido, alimento.idAlimento)
                }

            }


            await pedidosRepository.update(pedido);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
}

export const pedidosController = new PedidosController()