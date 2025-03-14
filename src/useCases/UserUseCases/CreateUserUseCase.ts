import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import bcrypt from "bcryptjs";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: ICreateUserDTO) {
        const userExistsEmail = await this.userRepository.findByEmail(data.email);
        const userExistsCPF = await this.userRepository.findByCPF(data.cpf);
        
        if(userExistsEmail)
            throw new Error("User with email already exists");

        if(userExistsCPF)
            throw new Error("User with cpf already exists");

        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = new User({...data, password: passwordHash});
        return await this.userRepository.save(user);
    }
}