import { ITransactionStatus } from "../../../entities/Transaction";

export interface ICreateTransactionDTO {
    id_user: number;
    description: string;
    points: number;
    value: number;
    transactionDate?: Date;
    status?: ITransactionStatus;
 }