import { Role } from "src/roles/roles.decorator";

export class User {
    username: string;
    password: string;
    roles: Role[];
}
