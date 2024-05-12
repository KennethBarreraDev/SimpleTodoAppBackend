import { ConnectionService } from "../../presentation/services/connectService"



interface Options {
    username: string,
    password: string,
    dbName: string
    port: number
}


export class PostgresConnection{
    static async connect(connectOptions: Options){
        return ConnectionService.connection(connectOptions)
    }
}