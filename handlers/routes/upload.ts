import express from 'express'
import getFilesHandler from '../files/getHandler'
import generateString from '../utils/random'

export default async function FileUploadHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.files?.upload) {
        return res.sendStatus(400)
    }

    const uploadedFile: { [key: string]: any } = req.files.upload
    const handler = getFilesHandler()
    const randomFileName = generateString(parseInt(process.env.RANDOM_FILE_NAMES_LENGTH as string)) + "." + uploadedFile.name.split(".")[uploadedFile.name.split(".").length - 1]
    const url = process.env.DOMAINS?.split(",")[Math.floor(Math.random()*process.env.DOMAINS?.split(",").length)]


    try {
        await handler.upload_file(uploadedFile.data, randomFileName)
    } catch (error) {
        console.error(error)
        return res.status(500).json({"error": "server error"})
    }

    res.status(200).json({
        name: randomFileName,
        link: `${url}/box/${randomFileName}`
    })
}