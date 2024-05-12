import { Sequelize, DataTypes } from "sequelize";
import { ConnectionService } from "../../../presentation/services/connectService";


export class UserModel {

  static async generateModel(conection: ConnectionService) {
    if (conection.conectionObject) {
      const User = conection.conectionObject.define(
        'User',
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: DataTypes.STRING,
          password: DataTypes.STRING,

        },
        {
          freezeTableName: true,
        },
      );

          // User.sync({ force: true }).then(
          //   (value) => {
          //     console.log("Success creating table")
          //   }
          // ).catch((error) => {
          //   console.log("Error creating model" + error)
          // })

      return User
    }

  }

}




