import { DataTypes, Model, Transaction } from "sequelize";
import { sequelize } from "./sequelize";
import { ITransactionStatus } from "../entities/Transaction";

//#region userModel
export class UserModel extends Model {
    id?: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    ballance: number;
}

UserModel.init({
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ballance: DataTypes.DECIMAL,
  }, { 
    sequelize, 
    modelName: 'User', 
    timestamps: false, 
  }
);
//#endregion

//#region transactionModel

export class TransactionModel extends Model {
  id: number;
  id_user: number;
  transactionDate: Date;
  description: string;
  points: number;
  value: number;
  status: ITransactionStatus;
}

TransactionModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("approved", "pending", "denied"),
      allowNull: false,
      defaultValue: "pending",
    },
}, {
  sequelize,
  modelName: 'Transaction',
  timestamps: false,
});

//#endregion

UserModel.hasMany(TransactionModel, { foreignKey: "id_user"});
TransactionModel.belongsTo(UserModel, { foreignKey: "id_user"});


export const models = { User: UserModel, Transaction: TransactionModel };