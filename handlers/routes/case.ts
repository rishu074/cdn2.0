import express from 'express'
import getFilesHandler from '../files/getHandler'

export default async function HandleGetFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    const file = req.params.name
    const handler = getFilesHandler()

    try {
        var response = await handler.get_file(file.toString())
        response.pipe(res)

    } catch (error: any) {
        // console.error(error)
        if(error?.message?.includes("404 Not Found")) {
            return res.end(error?.message)
        }
        console.error(error)

        res.end("An error got while fetching the file, please contact any admin.")
    } 
}