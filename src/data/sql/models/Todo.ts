import { ConnectionService } from "../../../presentation/services/connectService";
import { Sequelize, DataTypes } from "sequelize";

export class TodoModel{
    static async generateModel(conection: ConnectionService){
        
        const Todo = conection.conectionObject?.define(
            'Todo',
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4
                  },
                  title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
                  content: {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
            },
            {
                freezeTableName: true,
            }
        )

        console.log(conection.conectionObject!.models.User)
        conection.conectionObject!.models.User!.hasMany(Todo!, {
            foreignKey: {
                name: 'UserId', 
                allowNull: false 
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        })

        //   Todo!.sync({ force: true }).then(
        //     (value) => {
        //       console.log("Success creating table")
        //     }
        //   ).catch((error) => {
        //     console.log("Error creating model" + error)
        //   })

    }
}