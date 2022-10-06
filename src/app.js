import "./db/conn.js"

import dotenv from 'dotenv'

import express from "express"
import multer from "multer";

import signup from "./Api/signup.js"
import login from "./Api/login.js";

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

//for body parsing
app.use(express.json())

//for form data parsing
app.use(multer().array())

//for w-www-encodedurl parsing
app.use(express.urlencoded({ extended: true }))


app.use(signup)
app.use(login)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
