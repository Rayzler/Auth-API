import { type Elysia, t } from "elysia";
import { UserController } from "../controllers/UserController";
import { ElysiaSet } from "../types";
import jwt from "@elysiajs/jwt";

type Props = Elysia<"/api/v1/auth", false, { decorator: {}; store: {}; derive: {}; resolve: {} }, {
    type: {};
    error: {}
}, { schema: {}; macro: {} }, {}, { derive: {}; resolve: {}; schema: {} }, { derive: {}; resolve: {}; schema: {} }>

export default function userRouter(app: Props) {
    const userController = new UserController();

    return app
        .use(jwt({
            name: "jwt",
            secret: Bun.env.JWT_SECRET!
        }))
        .post("/signup", ({ body, set }) => userController.create(body, set as ElysiaSet), {
            body: t.Object({
                username: t.String(),
                email: t.String(),
                password: t.String({
                    minLength: 8
                })
            })
        })
        .post("/login", ({ body, set, jwt, cookie }) =>
            userController.login(body, set as ElysiaSet, jwt, cookie), {
            body: t.Object({
                email: t.String(),
                password: t.String()
            })
        })
        .get("/me", ({ set, jwt, cookie }) => userController.getProfile(set as ElysiaSet, jwt, cookie));
}