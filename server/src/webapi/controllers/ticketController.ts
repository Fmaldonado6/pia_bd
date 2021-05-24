import { paisRepository, callesRepository, coloniasRepository, municipioRepository, estadoRepository } from './../../persistence/repositories/direcionRepository';
import { TicketResource } from './../../models/models';
import { ticketRepository, ticketDetalleRepository } from './../../persistence/repositories/ticketRepository';
import { alimentosRepository } from '../../persistence/repositories/alimentosRepository';
import { infoSucursalRepository } from '../../persistence/repositories/infoSucursalRepository';
import { empleadosRepository } from '../../persistence/repositories/empleadosRepository';
import { Ticket, TicketDetalle, Pedido, PrivilegiosId } from '../../models/models';
import { Response } from "express";
import { BaseController, CustomRequest } from "./baseController";

class TicketController extends BaseController {

    constructor() {
        super()
        this.config()
    }

    config() {
        this.router.post("/", this.verifyToken, (req, res) => { this.createTicket(req as CustomRequest, res) })
        this.router.get("/", this.verifyToken, (req, res) => { this.getTickets(req as CustomRequest, res) })
        this.router.get("/:id", this.verifyToken, (req, res) => { this.getTicket(req as CustomRequest, res) })
        this.router.delete("/:id", this.verifyToken, (req, res) => { this.deleteTicket(req as CustomRequest, res) })
    }

    async createTicket(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const pedido = req.body as Pedido

            const empleado = await empleadosRepository.get(pedido.idEmpleado)

            if (!empleado)
                return res.sendStatus(404)

            const ticket = new Ticket()

            ticket.apellidoMaternoEmpleado = empleado.apellidoMaterno
            ticket.apellidoMaternoEmpleado = empleado.apellidoMaterno
            ticket.nombreEmpleado = empleado.nombre
            ticket.fechaTicket = new Date()
            ticket.subtotal = pedido.subtotal
            ticket.total = pedido.total
            ticket.descuento = pedido.descuento

            const sucursal = await infoSucursalRepository.get()


            if (!sucursal)
                return res.sendStatus(404)

            ticket.telefono = sucursal.telefono
            ticket.idPais = sucursal.idPais
            ticket.idCalle = sucursal.idCalle
            ticket.idColonia = sucursal.idColonia
            ticket.idEstado = sucursal.idEstado
            ticket.idMunicipio = sucursal.idMunicipio
            ticket.numero = sucursal.numero

            const newTicket = await ticketRepository.add(ticket)

            for (let detalle of pedido.alimentos) {

                const ticketDetalle = new TicketDetalle()
                const alimento = await alimentosRepository.get(detalle.idAlimento)


                ticketDetalle.idAlimento = detalle.idAlimento
                if (alimento)
                    ticketDetalle.nombreAlimento = alimento.nombre

                ticketDetalle.cantidad = detalle.cantidad
                ticketDetalle.precio = detalle.precio
                ticketDetalle.idTicket = newTicket.idTicket

                await ticketDetalleRepository.add(ticketDetalle)
            }

            res.status(200).json(newTicket)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    async getTicket(req: CustomRequest, res: Response) {
        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const idTicket = Number.parseInt(req.params.id)

            const ticket = await ticketRepository.get(idTicket) as TicketResource

            if (!ticket)
                return res.sendStatus(404)

            const detalles = await ticketDetalleRepository.getTicketDetalleByTicketId(idTicket)

            const pais = await paisRepository.get(ticket.idPais)
            const estado = await estadoRepository.get(ticket.idEstado)
            const municipio = await municipioRepository.get(ticket.idMunicipio)
            const colonia = await coloniasRepository.get(ticket.idColonia)
            const calle = await callesRepository.get(ticket.idCalle)

            if (pais) ticket.nombrePais = pais.nombre
            if (estado) ticket.nombreEmpleado = estado.nombre
            if (municipio) ticket.nombreMunicipio = municipio.nombre
            if (colonia) ticket.nombreColonia = colonia.nombre
            if (calle) ticket.nombreCalle = calle.nombre

            ticket.detalles = detalles

            res.status(200).json(ticket)


        } catch (error) {
            console.error(error)
            res.sendStatus(500)

        }
    }

    async getTickets(req: CustomRequest, res: Response) {

        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const tickets = await ticketRepository.findAll()

            res.status(200).json(tickets)


        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }

    }

    async deleteTicket(req: CustomRequest, res: Response) {

        try {

            const id = req.idEmpleado

            const hasPermission = await this.hasPermission(id, PrivilegiosId.gestionarPedidos)

            if (!hasPermission)
                return res.sendStatus(403)

            const ticketId = Number.parseInt(req.params.id)

            const detalles = await ticketDetalleRepository.getTicketDetalleByTicketId(ticketId)

            for (let detalle of detalles) {
                await ticketDetalleRepository.delete(detalle.idTicket, detalle.idAlimento)
            }

            await ticketRepository.delete(ticketId)

            res.status(200).json({})


        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }

    }

}

export const ticketController = new TicketController()