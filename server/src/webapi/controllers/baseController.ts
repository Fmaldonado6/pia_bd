import { Request, Router } from "express";
import jwt from 'jsonwebtoken'

export interface CustomRequest extends Request {
    idEmpleado: number
}

export class BaseController {
    public router = Router();


    async verifyToken(req: any, res: any, next: any) {
        try {
            if (!req.headers.authorization)
                return res.status(401).send('Unauhtorized Request');

            let token = req.headers.authorization.split(' ')[1];

            if (token === 'null')
                return res.status(401).send('Unauhtorized Request');


            const payload: any = jwt.verify(token, 'chunchunmaru');

            if (!payload)
                return res.status(401).send('Unauhtorized Request');

            req.idEmpleado = payload.idEmpleado

            next();

        } catch (e) {
            return res.status(401).send('Unauhtorized Request');
        }
    }

}