import { Router } from "express"
import { TodoController } from "./controllers"
import { AuthMiddleware } from "../middleware/auth.middleware"
import { JwtAdapter } from "../../config/jwtAdapter"
import { envs } from "../../config/envs"
import { TodoService } from "../services/TodoService"
import { ConnectionService } from "../services/connectService"


export const todoRoutes = (conection: ConnectionService): Router => {
      const router = Router()
      const todoService = new TodoService()
      const controller = new TodoController(todoService, conection)

      const jwtAdapter = new JwtAdapter(envs.JWT_SEED);

      const authMiddleware = new AuthMiddleware(jwtAdapter)

      router.post("/createTodo", [authMiddleware.validateJwt], controller.createTodo)
      router.get("/list", [authMiddleware.validateJwt], controller.getTodos)
      router.get("/todo/:id", [authMiddleware.validateJwt], controller.getTodo)
      router.put("/todo/:id", [authMiddleware.validateJwt], controller.updateTodo)
      router.delete("/todo/:id", [authMiddleware.validateJwt], controller.deleteTodo)


      
      return router
}
