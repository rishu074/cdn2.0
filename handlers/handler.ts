import { Express } from "express";
import NotFoundHandler from "./routes/404";
import ServeHtmlHandler from "./routes/serve/serve";

export default async function handler(app: Express) {
    app.set('view engine', 'ejs');

    // serve html files with the link
    app.get("/box/:link", ServeHtmlHandler)


    // 404 at everything
    app.use(NotFoundHandler)
    console.log("The app is ready to serve.")

}