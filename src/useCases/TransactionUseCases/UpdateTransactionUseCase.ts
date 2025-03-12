import { ITransactionStatus } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";

export class UpdateTransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(id: number, status: ITransactionStatus) {
        return await this.transactionRepository.update(id, status);
    }
}