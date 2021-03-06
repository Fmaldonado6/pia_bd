import { ticketController } from './controllers/ticketController';
import { pedidosController } from './controllers/pedidosController';
import { alimentosController } from './controllers/alimentosController';
import { direccionController } from './controllers/direccionController';
import { empleadosController } from './controllers/empleadosController';
import { privilegiosController } from './controllers/privilegiosController';
import { database } from './../persistence/database';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from "morgan";
import { authController } from './controllers/authController';
import { facturasController } from './controllers/facturasController';
import { sucursalController } from './controllers/sucursalController';

const PORT = 'port'

class Server {
    public app: Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config() {
        this.app.set(PORT, process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        database.connect()
    }

    routes() {

        this.app.use("/auth", authController.router)
        this.app.use("/empleados", empleadosController.router)
        this.app.use("/privilegios", privilegiosController.router)
        this.app.use("/direcciones", direccionController.router)
        this.app.use("/alimentos", alimentosController.router)
        this.app.use("/pedidos", pedidosController.router)
        this.app.use("/tickets", ticketController.router)
        this.app.use("/facturas", facturasController.router)
        this.app.use("/sucursal", sucursalController.router)

    }


    start() {
        const port = this.app.get(PORT)
        this.app.listen(port, () => {
            console.log("App listening on port " + port)
        })
    }

}

const server = new Server()
server.start()