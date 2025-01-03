
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization'];

    if (headersToken != undefined && headersToken.startsWith("Bearer ")) {
        try {
            const token = headersToken.slice(7); //quitar la palabra "Bearer"
            jwt.verify(token, process.env.SECRET_KEY || "4GaM[3s{8R}WF}D")
            next();
        } catch (error) {
            res.status(401).json({
                msg: "Token invalido"
            });
        }
        
    } else {
        res.status(401).json({
            msg: "Acceso no autorizado"
        });
    }
 
};

export default validateToken;