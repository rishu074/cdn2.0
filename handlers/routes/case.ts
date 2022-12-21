import express from 'express'
import getFilesHandler from '../files/getHandler'
import FilesHandler from '../files/file'

export default async function HandleGetFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    const file = req.params.name
    const handler = new FilesHandler()
    await handler.Init()

    try {
        var response = await handler.get_file(file.toString())
        response.pipe(res)

        response.once('end', () => {
            handler.destroy()
        })

    } catch (error: any) {
        // console.error(error)
        if(error?.message?.includes("404 Not Found")) {
            return res.end(error?.message)
        }
        console.error(error)

        res.end("An error got while fetching the file, please contact any admin.")
    } 
}