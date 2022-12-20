import { Express } from "express";

export default async function handler(app: Express) {
    app.get("/", (req, res) => res.send("Hello"))
}