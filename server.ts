/*
    Essentially import the things needed,
    Theese imports are required in order for the application to work
*/
import express from 'express'
import dotenv from 'dotenv'
import consoleStamp from 'console-stamp'
import handler from './handlers/handler'

/*
    Initializations of the required constants
*/
const app = express()
dotenv.config()
consoleStamp(console)
/*
    Start the application
*/
app.listen(process.env.PORT || 8080, () => {
    console.log("The application started on port " + process.env.PORT || 8080)
    return handler(app)
})