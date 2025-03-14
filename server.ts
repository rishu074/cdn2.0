/*
    Essentially import the things needed,
    Theese imports are required in order for the application to work
*/
import express from 'express'
import dotenv from 'dotenv'
import consoleStamp from 'console-stamp'
import handler from './handlers/handler'
import FilesHandler from './handlers/files/file'

/*
    Initializations of the required constants
*/
const app = express()
dotenv.config()
consoleStamp(console)

const filesH = new FilesHandler()// @ts-ignore
// @ts-ignore
process.FilesHandler = filesH

app.get("/test", async (req, res, next) => {
    let test = await filesH.get_file('test.txt')

    test.pipe(res)
})


/*
    Start the application
*/
app.listen(process.env.PORT || 8080, async () => {
    console.log("The application started on port " + process.env.PORT || 8080)
    console.log("Starting Fileserver.....")
    await filesH.Init()
    console.log("Successfully started file servers")
    console.log("Registering Listeners....")
    return handler(app)
})