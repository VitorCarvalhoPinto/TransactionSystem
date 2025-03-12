import { ITransactionStatus } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { TransactionModel } from "../../shared/models";
import { TransactionMapper } from "../../utils/transactions/mappers/TransactionsMapper";
import { ITransactionFiltersDTO } from "./dtos/ITransactionFilters";
import { ITransactionResponseDTO } from "./dtos/ITransactionResponseDTO";

export class GetAllTransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(filters: ITransactionFiltersDTO): Promise<ITransactionResponseDTO[]> {
        const transactions = await this.transactionRepository.getAll(filters);
        return TransactionMapper.toDTOList(transactions as TransactionModel[]);
    }
}