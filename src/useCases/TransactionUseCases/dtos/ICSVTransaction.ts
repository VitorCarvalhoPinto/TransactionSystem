import { ITransactionStatus } from "../../../entities/Transaction";

export interface ICsvTransaction {
    cpf: string;
    description: string;
    transactionDate: Date;
    points: number;
    value: number;
    status: ITransactionStatus;
  }