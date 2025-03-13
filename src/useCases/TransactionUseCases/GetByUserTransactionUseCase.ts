import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { TransactionModel } from "../../shared/models";
import { TransactionMapper } from "../../utils/transactions/mappers/TransactionsMapper";
import { ITransactionFiltersDTO } from "./dtos/ITransactionFilters";

export class GetByUserTransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(id_user: number, filters: ITransactionFiltersDTO) {
        const transaction = await this.transactionRepository.getByUser(id_user, filters);
        return TransactionMapper.toDTOList(transaction as unknown as TransactionModel[]);
    }
}