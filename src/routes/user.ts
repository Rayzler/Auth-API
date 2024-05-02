import { type Elysia, t } from "elysia";
import { UserController } from "../controllers/UserController";
import { ElysiaSet } from "../types";

type Props = Elysia<"/api/v1/auth", false, { decorator: {}; store: {}; derive: {}; resolve: {} }, {
    type: {};
    error: {}
}, { schema: {}; macro: {} }, {}, { derive: {}; resolve: {}; schema: {} }, { derive: {}; resolve: {}; schema: {} }>

export default function userRouter(app: Props) {
    const userController = new UserController();

    return app
        .post("/signup", ({ body, set }) => userController.create(body, set as ElysiaSet), {
            body: t.Object({
                username: t.String(),
                email: t.String(),
                password: t.String({
                    minLength: 8
                })
            })
        })
        .post("/login", ({ body, set }) => userController.login(body, set as ElysiaSet), {
            body: t.Object({
                email: t.String(),
                password: t.String()
            })
        });
}