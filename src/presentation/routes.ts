import { Router } from "express"
import { authRoutes } from "./auth/routes";
import { Sequelize } from "sequelize";
import { ConnectionService } from "./services/connectService";
import { todoRoutes } from "./todos/routes";
import { TodoService } from "./services/TodoService";

export const routes = (conection: ConnectionService)=>{
    const router = Router();
    const authRouter = authRoutes(conection)
    const todoService = new TodoService()
    const todoRouter = todoRoutes(conection)
    
    router.use("/api/auth", authRouter)
    router.use("/api/todos", todoRouter)
    
    return router
}