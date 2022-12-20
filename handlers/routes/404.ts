import express from 'express'

export default async function NotFoundHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.sendStatus(404)
}