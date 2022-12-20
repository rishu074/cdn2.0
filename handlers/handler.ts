import { Express } from "express";
import NotFoundHandler from "./routes/404";

export default async function handler(app: Express) {
    app.get("/", (req, res, next) => res.send("Hello"))


    // 404 at everything
    app.use(NotFoundHandler)
}