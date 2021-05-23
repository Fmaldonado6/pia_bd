import { alimentosRepository } from './../../persistence/repositories/alimentosRepository';
import { facturaDetalleRepository, facturasRepository } from './../../persistence/repositories/facturasRepository';
import { Factura, FacturaDetalle, PrivilegiosId } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { pedidoAlimentoRepository } from '../../persistence/repositories/pedidosRepository';

class FacturasController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {

        this.router.get("/", this.verifyToken, (req, res) => { this.getFacturas(req as CustomRequest, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.getFactura(req as CustomRequest, res) })
        this.router.post("/", this.verifyToken, (req, res) => { this.createFactura(req as CustomRequest, res) })
        this.router.put("/", this.verifyToken, (req, res) => { this.editFactura(req as CustomRequest, res) })
        this.router.delete("/:id", this.verifyToken, (req, res) => { this.deleteFactura(req as CustomRequest, res) })

    }

    //----------------------------------------PEDIDOS-----------------------------------------------------------

    async getFacturas(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarFacturas)

            if (!hasPermission)
                return res.sendStatus(403)

            const facturas = await facturasRepository.findAll()

            res.status(200).json(facturas)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async getFactura(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarFacturas)

            if (!hasPermission)
                return res.sendStatus(403)

            const idFactura = Number.parseInt(req.params.id)
            const factura = await facturasRepository.get(idFactura)

            if (!factura)
                return res.sendStatus(404)


            res.status(200).json(factura)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async createFactura(req: CustomRequest, res: Response) {
        try {
            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarFacturas)

            if (!hasPermission)
                return res.sendStatus(403)

            const factura = req.body as Factura

            factura.fechaFactura = new Date()

            const pedidoDetalles = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(factura.idPedido)


            const nuevaFactura = await facturasRepository.add(factura)

            factura.idFactura = nuevaFactura.idFactura

            for (let pedidoDetalle of pedidoDetalles) {

                const alimento = await alimentosRepository.get(pedidoDetalle.idAlimento)

                const facturaDetalle = new FacturaDetalle()

                facturaDetalle.idFactura = factura.idFactura
                facturaDetalle.idAlimento = pedidoDetalle.idAlimento
                facturaDetalle.cantidad = pedidoDetalle.cantidad
                facturaDetalle.precio = pedidoDetalle.precio

                if (alimento)
                    facturaDetalle.nombreAlimento = alimento.nombre

                await facturaDetalleRepository.add(facturaDetalle)
            }

            res.status(200).json(factura)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }


    async deleteFactura(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarFacturas)

            if (!hasPermission)
                return res.sendStatus(403)

            const deleteId = Number.parseInt(req.params.id)

            await facturasRepository.delete(deleteId);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

    async editFactura(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado
            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarFacturas)

            if (!hasPermission)
                return res.sendStatus(403)

            const factura = req.body as Factura

            await facturasRepository.update(factura);

            res.status(200).json()


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }
}