import { envs } from "./config/envs";
import { UserModel} from "./data/sql/models/User";
import { PostgresConnection } from "./data/sql/postgres-connect";
import { Server } from "./presentation/server";
import { routes } from "./presentation/routes";
import { JwtAdapter } from "./config/jwtAdapter";
import { RouterController } from "./domain/controllers/RouterController";
import { TodoModel } from "./data/sql/models/Todo";

async function main(){

    const connectionOptions = {
        username: envs.POSTGRES_USER,
        password: envs.POSTGRES_PASSWORD,
        dbName: envs.POSTGRES_DB,
        port: envs.DB_PORT
    }

    const conection = await PostgresConnection.connect(connectionOptions)

     await UserModel.generateModel(conection);
     await TodoModel.generateModel(conection)
     

    const appRoutes = routes(conection)


    const server = new Server(
        {
            port: envs.PORT,
            routes: appRoutes
        }
    )

    server.start()

}

main()
