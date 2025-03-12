import { TransactionModel } from "../../../shared/models";
import { ITransactionResponseDTO } from "../../../useCases/TransactionUseCases/dtos/ITransactionResponseDTO";

export class TransactionMapper {
    static toDTO(transaction: TransactionModel): ITransactionResponseDTO {
        return {
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            points: transaction.points,
            value: transaction.value,
            status: transaction.status,
            cpf: (transaction as any).User?.cpf || null
        };
    }

    static toDTOList(transactions: TransactionModel[]): ITransactionResponseDTO[] {
        return transactions.map((transaction) => this.toDTO(transaction));
    }
}