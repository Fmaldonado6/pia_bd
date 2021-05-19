import { Request, Router } from "express";
import jwt from 'jsonwebtoken'
import { PrivilegiosId } from "../../models/models";
import { empleadosRepository, privilegiosRepository } from "../../persistence/repositories/empleadosRepository";

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

    async hasPermission(empleadoId: number, privilegioId: PrivilegiosId): Promise<boolean> {

        const empleado = await empleadosRepository.get(empleadoId)
        if (!empleado)
            return false

        const privilegios = await privilegiosRepository.getPrivilefiosByTipoEmpleadoId(empleado.idTipoEmpleado)

        let found = false

        for (let privilegio of privilegios) {
            if (privilegio.idPrivilegio == privilegioId) {
                found = true
                break
            }
        }

        return found
    }

}