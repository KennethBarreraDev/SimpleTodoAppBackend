import { connect } from "http2";
import { Sequelize } from "sequelize";
import Model from "sequelize";
interface Options {
    username: string,
    password: string,
    dbName: string
    port: number
}

export class ConnectionService {
    constructor(
        public readonly conectionObject?: Sequelize
    ) { 

    }

    static connection = async (connectOptions: Options): Promise<ConnectionService>=> {
        const { username, password, dbName, port } = connectOptions
        const url = `postgres://${username}:${password}@localhost:${port}/${dbName}`
        console.log(url)
        const sequelize = new Sequelize(url)

        try {
            await sequelize.authenticate();
            console.log('Successs in db connection');
            return new ConnectionService(sequelize);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return new ConnectionService()

        }
    }

}