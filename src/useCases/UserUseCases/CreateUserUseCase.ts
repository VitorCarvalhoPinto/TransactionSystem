import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import bcrypt from "bcryptjs";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: ICreateUserDTO) {
        const userExists = await this.userRepository.findByEmail(data.email);
        
        if(userExists)
            throw new Error("User already exists");

        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = new User({...data, password: passwordHash});
        
        return await this.userRepository.save(user);
    }
}