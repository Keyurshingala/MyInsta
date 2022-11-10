import express from 'express';
import checkAuth from '../services/checkAuth.js';
import postCollection from '../models/postModel.js';
import mongoose from 'mongoose';

const comment = new express.Router();

comment.post('/comment/:id', checkAuth, async (req, res) => {
    try {
        const user = await req.user;
        const id = await req.params.id;
        const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });

        let cmt = {
            username: user.username.toString(),
            commnet: req.comment.toString(),
        };

        post.comment.unshift(cmt)

        const result = await post.save();

        console.log(result);

        res.send(result);

    } catch (e) {
        res.send(e)
    }
});

export default comment;