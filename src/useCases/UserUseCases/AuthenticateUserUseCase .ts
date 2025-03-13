import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IAuthenticateUserDTO } from "./dtos/IAuthenticateUserDTO";
import { IAuthenticateUserResponseDTO } from "./dtos/IAuthenticateUserResponseDTO";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthenticateUserUseCase  {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
        const { email } = user;
        const userExists = await this.userRepository.findByEmail(email);

        if(!userExists) throw new Error("Invalid email/password");

        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if(!passwordMatch) throw new Error("Invalid email/password");

        const token = Jwt.sign(
            { email: userExists.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        return { token, user: userExists };
    }
}