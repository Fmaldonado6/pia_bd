import { infoSucursalRepository } from './../../persistence/repositories/infoSucursalRepository';
import { callesRepository } from './../../persistence/repositories/direcionRepository';
import { alimentosRepository } from './../../persistence/repositories/alimentosRepository';
import { facturaDetalleRepository, facturasRepository } from './../../persistence/repositories/facturasRepository';
import { Calle, Colonia, Factura, FacturaDetalle, FacturaResource, PrivilegiosId } from './../../models/models';
import { Request, Response } from 'express';
import { BaseController, CustomRequest } from './baseController';
import { pedidoAlimentoRepository } from '../../persistence/repositories/pedidosRepository';
import { coloniasRepository, estadoRepository, municipioRepository, paisRepository } from '../../persistence/repositories/direcionRepository';

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
            const factura = await facturasRepository.get(idFactura) as FacturaResource

            if (!factura)
                return res.sendStatus(404)

            const pais = await paisRepository.get(factura.idPais)
            const estado = await estadoRepository.get(factura.idEstado)
            const municipio = await municipioRepository.get(factura.idMunicipio)
            const colonia = await coloniasRepository.get(factura.idColonia)
            const calle = await callesRepository.get(factura.idCalle)

            if (pais)
                factura.nombrePais = pais.nombre

            if (estado)
                factura.nombreEstado = estado.nombre

            if (municipio)
                factura.nombreMunicipio = municipio.nombre

            if (colonia)
                factura.nombreColonia = colonia.nombre

            if (calle)
                factura.nombreCalle = calle.nombre

            const infoNegocio = await infoSucursalRepository.get()

            if (infoNegocio) {

                const paisNegocio = await paisRepository.get(infoNegocio.idPais)
                const estadoNegocio = await estadoRepository.get(infoNegocio.idEstado)
                const municipioNegocio = await municipioRepository.get(infoNegocio.idMunicipio)
                const coloniaNegocio = await coloniasRepository.get(infoNegocio.idColonia)
                const calleNegocio = await callesRepository.get(infoNegocio.idCalle)

                if (paisNegocio)
                    factura.nombrePaisNegocio = paisNegocio.nombre

                if (estadoNegocio)
                    factura.nombreEstadoNegocio = estadoNegocio.nombre

                if (municipioNegocio)
                    factura.nombreMunicipioNegocio = municipioNegocio.nombre

                if (coloniaNegocio)
                    factura.nombreColoniaNegocio = coloniaNegocio.nombre

                if (calleNegocio)
                    factura.nombreCalleNegocio = calleNegocio.nombre

                factura.numeroNegocio = infoNegocio.numero
                factura.telefonoNegocio = infoNegocio.telefono


            }

            const detalles = await facturaDetalleRepository.getFacturaDetalleByFacturaId(factura.idFactura)

            factura.detalles = detalles

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

            const factura = req.body as FacturaResource

            factura.fechaFactura = new Date()

            const pedidoDetalles = await pedidoAlimentoRepository.getPedidosAlimentosByPedidoId(factura.idPedido)

            let colonia = await coloniasRepository.getColoniaByNameAndMunicipioId(factura.nombreColonia, factura.idMunicipio)

            if (!colonia) {
                colonia = new Colonia()
                colonia.idMunicipio = factura.idMunicipio
                colonia.nombre = factura.nombreColonia
                colonia = await coloniasRepository.add(colonia)
            }

            let calle = await callesRepository.getCallesByNameAndColoniaId(factura.nombreCalle, factura.idColonia)

            if (!calle) {
                calle = new Calle()
                calle.idColonia = colonia.idColonia
                calle.nombre = factura.nombreCalle
                calle = await callesRepository.add(calle)
            }

            factura.idColonia = colonia.idColonia
            factura.idCalle = calle.idCalle

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

export const facturasController = new FacturasController()