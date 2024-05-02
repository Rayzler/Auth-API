import jwt from "jsonwebtoken";

export function sign(payload: string) {
    const secret = Bun.env.JWT_SECRET as string;
    
    return jwt.sign({ 
        data: payload
    }, secret, {
        expiresIn: "1d"
    });
}

export function verify(token: string) {
    return jwt.verify(token, Bun.env.JWT_SECRET as string);
}