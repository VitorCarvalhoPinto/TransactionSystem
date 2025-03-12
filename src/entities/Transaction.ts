import { User } from "./User";

export interface ITransactionStatus {
    name: "approved" | "pending" | "denied";
}

export class Transaction {
    id: number;
    id_user: number;
    transactionDate: Date;
    description: string;
    points: number;
    value: number;
    status: ITransactionStatus;

    constructor(props: Omit<Transaction, "id">, id?: number) {
        Object.assign(this, props);
    }
}