import { Sequelize } from "sequelize";
import { CreateTodoDto } from "../../domain/dtos/todos/CreateTodoDto";
import { CustomError } from "../../domain/errors/CustomErrors";
import { UpdateTodoDto } from "../../domain/dtos/todos/UpdateTodoDto";

export class TodoService {
    public async createTodo(newTodo: CreateTodoDto, userId: String, sequelize: Sequelize) {
        try {

            await sequelize.models.Todo.create({ title: newTodo?.title, content: newTodo?.content, UserId: userId });
            console.log("Success creating todo");
        } catch (error) {

            console.error("Error creating todo:", error);

            throw CustomError.badRequest("Unable to process data");
        }
    }

    public async getTodos(userId: String, sequelize: Sequelize) {
        try {
            const todos = await sequelize.models.Todo.findAll({ where: { UserId: userId } })
            return todos
        } catch (error) {
            console.error("Error creating todo:", error);
            throw CustomError.badRequest("Unable to process data");
        }
    }

    public async getTodo(todoId: String, userId: String, sequelize: Sequelize) {
        try {
            const todos = await sequelize.models.Todo.findAll({ where: { UserId: userId, id: todoId } })
            return todos
        } catch (error) {
            console.error("Error creating todo:", error);
            throw CustomError.badRequest("Unable to process data");
        }
    }

    public async updateTodo(updateTodo: UpdateTodoDto, todoId: String, userId: String, sequelize: Sequelize) {
        try {
            const todos = await sequelize.models.Todo.findOne({ where: { UserId: userId, id: todoId } })
            console.log("Todo is")
            console.log(todos)

            if(!todos){
                throw CustomError.badRequest("Unable to find todo");
            }
            if (todos) {
                return await sequelize.models.Todo.update({ 
                    title: updateTodo.title != undefined ? updateTodo.title : todos.dataValues.title,
                    content: updateTodo.content != undefined ? updateTodo.content : todos.dataValues.content,
                 },
                    {
                        where: {
                            id: todoId,
                            UserId: userId
                        },
                    },)

            }
        } catch (error) {
            console.error("Error creating todo:", error);
            throw CustomError.badRequest("Unable to find todo");
        }

    }

    
    public async deleteTodo(todoId: String, userId: String, sequelize: Sequelize) {
        try {
            const todos = await sequelize.models.Todo.findOne({ where: { UserId: userId, id: todoId } })

            if(!todos){
                throw CustomError.badRequest("Unable to find todo");
            }
            if (todos) {
                return await sequelize.models.Todo.destroy(
                    {
                        where: {
                            id: todoId,
                            UserId: userId
                        },
                    },)

            }
        } catch (error) {
            console.error("Error creating todo:", error);
            throw CustomError.badRequest("Unable to find todo");
        }

    }
}