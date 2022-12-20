import express from 'express'
import path from 'path'

export default async function ServeHtmlHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const fileToGet = req.params.link
    const url = new URL(req.url, `https://${req.headers.host}`)


    res.render(path.join(process.cwd(), 'handlers/routes/serve/page.ejs'), {
        imageDirectLink: `${url.origin}/case/${fileToGet}`,
        app_link: url.origin,
        title: process.env.TITLES?.split(",")[Math.floor(Math.random() * process.env.TITLES?.split(",").length)],
        description: process.env.DESCRIPTIONS?.split(",")[Math.floor(Math.random() * process.env.DESCRIPTIONS?.split(",").length)],
    })
}