import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { ICreateTransactionDTO } from "./dtos/ICreateTransactionDTO";

export class CreateTransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(data: ICreateTransactionDTO) {
        return await this.transactionRepository.save(data);
    }
}