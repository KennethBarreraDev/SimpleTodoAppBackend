import { Router } from "express"
import {AuthControllers } from "./controllers"
import { AuthService } from "../services/AuthService"
import { Sequelize } from "sequelize"
import { ConnectionService } from "../services/connectService"
import { envs } from "../../config/envs"

import { JwtAdapter } from "../../config/jwtAdapter"

export const authRoutes = (conection: ConnectionService): Router=>{
    const router = Router()

    const jwtAdapter = new JwtAdapter(envs.JWT_SEED);


    const auth = new AuthService(jwtAdapter)
    
    const controller = new AuthControllers( auth, conection)



    router.post("/login", controller.loginController)
    router.post("/register", controller.registerController)


    return router
}