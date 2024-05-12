import { RegisterUserDto } from "../../domain/dtos/auth/RegisterUserDto"
import { CustomError } from "../../domain/errors/CustomErrors";
import { Sequelize } from "sequelize";
import { bcryptAdapter } from "../../config/bcryptAdapter";
import { JwtAdapter } from "../../config/jwtAdapter";
import { LoginUserDto } from "../../domain/dtos/auth/LoginUserDto";

export class AuthService{

    private readonly  jwtGenerator: JwtAdapter;
    constructor(jwtGenerator: JwtAdapter){
        this.jwtGenerator= jwtGenerator;
    }

    public getJWTAdapter(): JwtAdapter{
      return  this.jwtGenerator
    }



    public async registerUser(registerUserDTO: RegisterUserDto, sequelize: Sequelize){

            const user = await sequelize.models.User.findOne({ where: { email: registerUserDTO.email } });
            console.log('Usuario encontrado:', user ? user.toJSON() : 'No se encontró ningún usuario con ese ID');

            if(user){
                console.log("Lanzando error")
                throw CustomError.badRequest("User already exist");
            }

            else{
                try{
                    registerUserDTO.password =  bcryptAdapter.hash(registerUserDTO.password);

                    await sequelize.models.User.create({ firstName: registerUserDTO.name, lastName: registerUserDTO.lastName, email: registerUserDTO.email, password:registerUserDTO.password});

                    console.log("Success creating user")
      
                }catch(error){
                    throw CustomError.badRequest("Unable to register user, verify your data")
                }
            }


    }


    
    public async loginUser(loginUserDto: LoginUserDto, sequelize: Sequelize){

        const user = await sequelize.models.User.findOne({ where: { email: loginUserDto.email } });
        console.log('Usuario encontrado:', user ? user.toJSON() : 'No se encontró ningún usuario con ese ID');

        if(!user){
            //console.log("Lanzando error")
            throw CustomError.badRequest("User does not exist");
        }

        else{
            try{
                const userJson = user.toJSON();
               const correctPassword = bcryptAdapter.compare(loginUserDto.password, userJson["password"]);
               //console.log(correctPassword)

               if(!correctPassword){
                throw CustomError.badRequest("Wrong user credentials")
               }
               else{
                const {firstName, lastName, email,id } = userJson

                const userModel = {firstName, lastName, email, id}

                 return this.jwtGenerator.generateToken(userModel)
                console.log(userModel)
               }
  
            }catch(error){
                throw CustomError.badRequest("Wrong user credentials")
            }
        }


}
}