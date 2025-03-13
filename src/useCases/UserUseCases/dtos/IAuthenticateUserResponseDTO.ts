import { IAuthenticateUserDTO } from "./IAuthenticateUserDTO";

export interface IAuthenticateUserResponseDTO { 
    token: string; 
    user: IAuthenticateUserDTO; 
}