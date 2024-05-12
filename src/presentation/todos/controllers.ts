import { Request, Response } from "express";
import { TodoService } from "../services/TodoService";
import { ConnectionService } from "../services/connectService";
import { CustomError } from "../../domain/errors/CustomErrors";
import { CreateTodoDto } from "../../domain/dtos/todos/CreateTodoDto";
import { UpdateTodoDto } from "../../domain/dtos/todos/UpdateTodoDto";

export class TodoController {

    private handleError = (error: CustomError, res: Response) => {
        return res.status(error.code).send(error.message)
    }

    constructor(private readonly todoService: TodoService, private readonly conection: ConnectionService) {

    }

    createTodo = async (req: Request, res: Response) => {
        const [error, newTodo] = CreateTodoDto.create(req.body)

        if (error) {
            this.handleError(new CustomError(400, error), res)
        }

        else {
            try {
                await this.todoService.createTodo(newTodo!, res.locals.userId, this.conection.conectionObject!)
                return res.status(200).send("Success creating todo")
            } catch (error) {
                this.handleError(error as CustomError, res)
            }
        }
    }

    getTodos = async (req: Request, res: Response) => {
        try {


            const todos = await this.todoService.getTodos(res.locals.userId, this.conection.conectionObject!)

            return res.status(200).send({
                count: todos.length,
                data: todos
            })
        } catch (error) {
            this.handleError(error as CustomError, res)
        }
    }

    getTodo = async (req: Request, res: Response) => {
        try {

            const todoId = req.params.id

            if (!todoId) {
                this.handleError(new CustomError(400, "Please, specify a todo ID"), res)
            }
            else {
                const todos = await this.todoService.getTodo(req.params.id, res.locals.userId, this.conection.conectionObject!)

                return res.status(200).send({
                    count: todos.length,
                    data: todos
                })
            }

        } catch (error) {
            this.handleError(error as CustomError, res)
        }
    }


    updateTodo = async (req: Request, res: Response) => {
        try {

            const todoId = req.params.id

            if (!todoId) {
                this.handleError(new CustomError(400, "Please, specify a todo ID"), res)
            }

            const [error, todo] = UpdateTodoDto.update(req.body)


            if (error) {
                this.handleError(CustomError.badRequest(error), res)
            }
            else {
        
                const todos = await this.todoService.updateTodo(todo!, req.params.id, res.locals.userId, this.conection.conectionObject!)
                return res.status(200).send({
                    result: "Success updating todos"
                })

            }

        } catch (error) {
            this.handleError(error as CustomError, res)
        }
    }

    
    deleteTodo = async (req: Request, res: Response) => {
        try {

            const todoId = req.params.id

            if (!todoId) {
                this.handleError(new CustomError(400, "Please, specify a todo ID"), res)
            }

            else {
        
                const todos = await this.todoService.deleteTodo( req.params.id, res.locals.userId, this.conection.conectionObject!)
                return res.status(200).send({
                    result: "Success deleting todo"
                })

            }

        } catch (error) {
            this.handleError(error as CustomError, res)
        }
    }


}