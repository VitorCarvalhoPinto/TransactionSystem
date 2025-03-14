import { CreateTransactionUseCase } from "../CreateTransactionUseCase";
import { Request, Response } from "express";
import { UpdateTransactionUseCase } from "../UpdateTransactionUseCase";
import { GetAllTransactionUseCase } from "../GetAllTransactionUseCase";
import { GetByUserTransactionUseCase } from "../GetByUserTransactionUseCase";
import { ITransactionFiltersDTO } from "../dtos/ITransactionFilters";
import { CreateTransactionCSVUseCase } from "../CreateTransactionCSVUseCase";

export class TransactionController {
    constructor(
        private createTransactionUseCase: CreateTransactionUseCase,
        private createTransactionCSVUseCase: CreateTransactionCSVUseCase,
        private updateTransactionUseCase: UpdateTransactionUseCase,
        private getAllTransactionUseCase: GetAllTransactionUseCase,
        private getByUserTransactionUseCase: GetByUserTransactionUseCase
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try{
            const user = await this.createTransactionUseCase.execute(req.body);
            return res.status(201).json(user);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async updateStatus(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const { status } = req.body;

            if (!["pending", "approved", "denied"].includes(status)) {
                return res.status(400).json({ error: "Invalid status" });
            }

            await this.updateTransactionUseCase.execute(Number(id), status);
            
            return res.status(200).json({ message: "Transaction updated successfully" });
        } 
        catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const filters: any = req.query;
            const transactions = await this.getAllTransactionUseCase.execute(filters);
            return res.status(200).json(transactions);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getByUser(req: Request, res: Response): Promise<Response> {
        try{
            const { id_user } = req.params;
            const filters: any = req.query;
            const transactions = await this.getByUserTransactionUseCase.execute(Number(id_user), filters);
            return res.status(200).json(transactions);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async csv(req: Request, res: Response): Promise<Response> {
        try{
            if(!req.file) return res.status(400).json({ message: "Arquivo CSV obrigatório" });
            
            await this.createTransactionCSVUseCase.execute(req.file.path);

            return res.status(201).json("Inserido com sucesso");
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}