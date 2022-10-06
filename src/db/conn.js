import env from 'dotenv'
import mongoose from "mongoose";

env.config()

let dbProtocol = process.env.DB_PROTOCOL
let dbHost = process.env.DB_HOST
let dbName = process.env.DB_NAME

mongoose.connect(`${dbProtocol}://${dbHost}/${dbName}`)
    .then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log(err);
    });
