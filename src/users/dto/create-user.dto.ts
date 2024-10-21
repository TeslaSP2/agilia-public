import { Role } from "src/roles/roles.decorator";

export class CreateUserDto {
    
    username: string;
    password: string;
    roles: Role[];
}
