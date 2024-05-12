import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwtAdapter";

export class AuthMiddleware {

    private static jwtGenerator: JwtAdapter;

    constructor(jwtAdapter: JwtAdapter) {
        AuthMiddleware.jwtGenerator = jwtAdapter
    }

    public async validateJwt(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')

        if(!authorization){
            return res.status(403).send("Missing token")
        }
        if ( !authorization.startsWith('Bearer ') ) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const token = authorization.split(' ')[1]

        const [error, success] = await AuthMiddleware.jwtGenerator.verifyToken(token)
        

        if(error){
            console.log(error)
            return res.status(403).json({ error: 'Invalid token' });
        }

        if(success){
            res.locals.userId = success.id
        }
        next()
    }
}