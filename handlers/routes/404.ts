import express from 'express'
import getFilesHandler from '../files/getHandler'

export default async function NotFoundHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.sendStatus(404)
}