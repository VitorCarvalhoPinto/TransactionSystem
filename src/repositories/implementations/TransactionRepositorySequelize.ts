import { Op, where, WhereOptions } from "sequelize";
import { Transaction, ITransactionStatus } from "../../entities/Transaction";
import { models, TransactionModel, UserModel } from "../../shared/models";
import { ITransactionFiltersDTO } from "../../useCases/TransactionUseCases/dtos/ITransactionFilters";
import { ITransactionRepository } from "../interfaces/ITransactionRepository";
import { ITransactionResponseDTO } from "../../useCases/TransactionUseCases/dtos/ITransactionResponseDTO";
import { UserRepositorySequelize } from "./UserRepositorySequelize";


export class TransactionRepositorySequelize implements ITransactionRepository {

    constructor(private userRepository: UserRepositorySequelize) {}

    async save(data: { id_user: number; points: number; value: number }): Promise<Transaction> {
        
        const newTransaction = await models.Transaction.create({
            ...data,
            transactionDate: new Date(),
            status: "pending"
        });
        
        const userId = data.id_user;
        
        const ballanceValue = await this.userRepository.getUserBallance(data.id_user)
        const newBallance: number = Number(ballanceValue) - data.value;
        await models.User.update({ ballance: newBallance }, { where: { id: userId } })

        return new Transaction({
            id_user: newTransaction.id_user,
            description: newTransaction.description,
            points: newTransaction.points,
            value: newTransaction.value,
            transactionDate: newTransaction.transactionDate,
            status: newTransaction.status,
        });
    }

    async update(id: number, status: ITransactionStatus): Promise<void> {
        await models.Transaction.update({ status }, { where: { id } });
    }

    async getAll(filters: ITransactionFiltersDTO): Promise<ITransactionResponseDTO[]> {
    
        const where: WhereOptions = {};
        const include: any[] = [{model: UserModel, attributes: ["cpf"]}];

        if(filters.cpf) include[0].where = {cpf: filters.cpf};
        if(filters.description) where.description = {[Op.like]: `%${filters.description}%`};
        if(filters.status) where.status = filters.status;
        if(filters.id_user) where.id_user = filters.id_user;
        if(filters.startDate && filters.endDate) where.transactionDate = {[Op.between]: [filters.startDate, filters.endDate]};

        return await TransactionModel.findAll({ where, include })
    }

    async getByUser(id_user: number, filters: ITransactionFiltersDTO): Promise<ITransactionResponseDTO[]> {
        const where: WhereOptions = { id_user };
        const include: any[] = [{model: UserModel, attributes: ["cpf"]}];

        if(filters.description) where.description = {[Op.like]: `%${filters.description}%`};
        if(filters.status) where.status = filters.status;
        if(filters.startDate && filters.endDate) where.transactionDate = {[Op.between]: [filters.startDate, filters.endDate]};
        
        return await TransactionModel.findAll({ where: where, include });
    }
}