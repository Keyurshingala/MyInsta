import "./db/conn.js"

import dotenv from 'dotenv'

import express from "express"
import multer from "multer";
import fileUpload from "express-fileupload";
import path from 'path'

import signup from "./Api/signup.js"
import login from "./Api/login.js";
import home from "./Api/home.js"
import post from './Api/post.js'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT
console.log("222");


console.log(path.resolve("images"));


//for uploading file
app.use(fileUpload())

//for body parsing
app.use(express.json())

//for form data parsing
// app.use(multer().array())

//for w-www-encodedurl parsing
app.use(express.urlencoded({ extended: true }))


app.use(signup)
app.use(login)


app.use(home)
app.use(post)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
