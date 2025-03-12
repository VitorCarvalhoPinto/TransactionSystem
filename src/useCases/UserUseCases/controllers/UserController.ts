import { CreateUserUseCase } from "../CreateUserUseCase";
import { Request, Response } from "express";

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async create(req: Request, res: Response): Promise<Response> {
        try{
            const user = await this.createUserUseCase.execute(req.body);
            return res.status(201).json(user);
        } catch(e) {
            return res.status(400).json({ message: e.message });
        }
    }
}