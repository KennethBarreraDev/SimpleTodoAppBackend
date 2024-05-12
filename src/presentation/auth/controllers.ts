import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/auth/RegisterUserDto"
import { json } from "sequelize";
import { AuthService } from "../services/AuthService";
import { Sequelize, DataTypes } from "sequelize";
import { CustomError } from "../../domain/errors/CustomErrors";
import { ConnectionService } from "../services/connectService";
import { RouterController } from "../../domain/controllers/RouterController";
import { LoginUserDto } from "../../domain/dtos/auth/LoginUserDto";

export class AuthControllers {
  handleError = (error: any, res: Response) => {
    const customError = error as CustomError;
    res.send(customError.message)
  }

  constructor(public readonly authService: AuthService, public readonly conection: ConnectionService) {

  }

  loginController = (req: Request, res: Response) => {
    const [error, user] = LoginUserDto.create(req.body)
    if(error){
      return res.status(400).send(json(error));
    }
    else{
      this.authService.loginUser(user!, this.conection.conectionObject!).then((value) => {
        return res.status(200).json({token: value})

       }).catch((error) => {
         this.handleError(error, res)
 
       })
    }
  }

  registerController = (req: Request, res: Response) => {
    const [error, user] = RegisterUserDto.create(req.body)
    if (error)
      return res.status(400).send(json(error));

    else {
      this.authService.registerUser(user!, this.conection.conectionObject!).then((value) => {
       res.json({"status": "Success creating user"})
      }).catch((error) => {
        this.handleError(error, res)

      })
    }
  }
}