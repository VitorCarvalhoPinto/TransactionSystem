import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICsvTransaction } from "./dtos/ICSVTransaction";

import fs from "fs";
import csvParser from "csv-parser";
import { ITransactionStatus } from "../../entities/Transaction";

export class CreateTransactionCSVUseCase {
    constructor(
        private transactionRepository: ITransactionRepository, 
        private userRepository: IUserRepository
    ) {}

    async execute(filePath: string): Promise<void> {
        const transactions: ICsvTransaction[] = []

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
            .pipe(csvParser({ separator: ";" }))
            .on("data", async(row) => {                
                const transaction: ICsvTransaction = {
                    cpf: row["cpf"],
                    description: row["desc"],
                    transactionDate: new Date(row["data"]),
                    points: parseInt(row["valorp"].replace(",", ""), 10),
                    value: parseFloat(row["valor"].replace(".", "").replace(",", ".")),
                    status: row["status"].toLowerCase() as ITransactionStatus,
                  };
                  transactions.push(transaction);
            })
            .on("end", async() => {
                for(const transaction of transactions) {
                    
                    const user = await this.userRepository.findByCPF(transaction.cpf)

                    if(!user) reject("User Not Found")

                    if(user) {
                        await this.transactionRepository.save({
                            id_user: Number(user.id),
                            transactionDate: new Date(),
                            description: transaction.description,
                            points: transaction.points,
                            value: transaction.value,
                            status: transaction.status,
                        })
                    }
                }

                fs.unlinkSync(filePath);
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            })
        })
    }
}
