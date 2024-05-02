import { UserService } from "../services/UserServices";
import { ElysiaSet, IUser } from "../types";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    create = async ({ username, email, password }: IUser, set: ElysiaSet) => {
        try {
            const user = await this.userService.create(username, email, password);
            set.status = 201;
            return {
                data: user
            };
        } catch (error) {
            set.status = 500;
            return {
                error: "Internal server error"
            };
        }
    };
    
    login = async ({ email, password }: Omit<IUser, "username">, set: ElysiaSet) => {
        try {
            const user = await this.userService.login(email, password);
            
            if (!user) {
                set.status = 401;
                return {
                    error: "Unauthorized"
                };
            }
            
            set.status = 200;
            return {
                data: user
            };
        } catch (error) {
            set.status = 500;
            return {
                error: "Internal server error"
            };
        }
    };
}