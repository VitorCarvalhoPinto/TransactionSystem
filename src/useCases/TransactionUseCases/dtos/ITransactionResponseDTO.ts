import { ITransactionStatus } from "../../../entities/Transaction";
import { User } from "../../../entities/User";

export interface ITransactionResponseDTO {
    id: number,
    cpf?: string;
    description: string;
    transactionDate: Date;
    points: number;
    value: number;
    status: ITransactionStatus;
}