import "./db/conn.js"

import dotenv from 'dotenv'

import express from "express"
import multer from "multer";
import fileUpload from "express-fileupload";

import signup from "./Api/signup.js"
import login from "./Api/login.js";
import home from "./Api/home.js"
import post from './Api/post.js'
import file from "./Api/file.js";
import like from "./Api/like.js";
import search from "./Api/search.js";
import comment from "./Api/comment.js";

dotenv.config()

const app = express()
const port = express.port || process.env.SERVER_PORT

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
app.use(file)
app.use(like)
app.use(comment)
app.use(search)

app.listen(5000, () => {
    console.log(`Listening on port ${port}`);
})
