import { privilegiosController } from './controllers/privilegiosController';
import { database } from './../persistence/database';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from "morgan";

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

        this.app.use("/privilegios", privilegiosController.router)

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