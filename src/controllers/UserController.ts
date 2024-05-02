import { UserService } from "../services/UserServices";
import { ElysiaJwt, ElysiaSet, IUser } from "../types";
import { Cookie } from "elysia";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create({ username, email, password }: IUser, set: ElysiaSet) {
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

    async login({ email, password }: Omit<IUser, "username">, set: ElysiaSet,
                jwt: ElysiaJwt, cookie: Record<string, Cookie<any>>) {
        try {
            const user = await this.userService.login(email, password, jwt, cookie.auth);

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

    async getProfile(set: ElysiaSet, jwt: ElysiaJwt, cookie: Record<string, Cookie<any>>) {
        try {
            const user = await this.userService.getProfile(set, jwt, cookie.auth);
            return {
                data: user
            };
        } catch (error) {
            return {
                error: "Internal server error"
            };
        }
    }
}