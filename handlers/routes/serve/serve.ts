import express from 'express'

export default async function ServeHtmlHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.sendStatus(404)
}