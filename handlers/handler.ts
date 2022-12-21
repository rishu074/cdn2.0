import { Express } from "express";
import NotFoundHandler from "./routes/404";
import ServeHtmlHandler from "./routes/serve/serve";
import HandleGetFile from "./routes/case";
import FileUploadHandler from "./routes/upload";
import expressFileUpload from 'express-fileupload'

export default async function handler(app: Express) {
    app.set('view engine', 'ejs');

    // serve html files with the link
    app.get("/box/:link", ServeHtmlHandler)
    app.get("/case/:name", HandleGetFile)
    app.post("/upload", expressFileUpload({
        safeFileNames: true,
        limits: { fileSize: (parseInt(process.env.MAX_UPLOAD as any) * 1e+6) },
        abortOnLimit: true,
        responseOnLimit: JSON.stringify({ "error": "File size limit reached." }),
        preserveExtension: true
    }), FileUploadHandler)


    // 404 at everything
    app.use(NotFoundHandler)
    console.log("The app is ready to serve.")

}