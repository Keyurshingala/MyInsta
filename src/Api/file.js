import express from "express";
import path from 'path';
import postCollection from "../models/postModel.js";
import mongoose from "mongoose";

const file = new express.Router()

file.get('/file/:id', async (req, res) => {
    try {

        let id = await req.params.id
        // console.log(id);

        let post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) })
        // console.log(post);

        // let fileName = path.resolve(post.image)
        let fileName = post.image
        res.sendFile(fileName, (e) => {
            if (e) {
                next(e);
            } else {
                console.log('Sent:', fileName);
            }
        })



    } catch (e) {
        console.log(e);
        res.send(e)
    }
})

export default file