import { Transaction, ITransactionStatus } from "../../entities/Transaction";
import { ICreateTransactionDTO } from "../../useCases/TransactionUseCases/dtos/ICreateTransactionDTO";
import { ITransactionFiltersDTO } from "../../useCases/TransactionUseCases/dtos/ITransactionFilters";
import { ITransactionResponseDTO } from "../../useCases/TransactionUseCases/dtos/ITransactionResponseDTO";

export interface ITransactionRepository {
    save(data: ICreateTransactionDTO): Promise<Transaction>;
    update(id: number, status: ITransactionStatus): Promise<void>;
    getAll(filters: ITransactionFiltersDTO): Promise<ITransactionResponseDTO[]>;
    getByUser(id_user: number, filters: ITransactionFiltersDTO): Promise<ITransactionResponseDTO[]>;
    //implementar upload de arquivo
}