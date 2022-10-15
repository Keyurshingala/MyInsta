import express from 'express';
import checkAuth from '../services/checkAuth.js';
import postCollection from '../models/postModel.js';
import mongoose from 'mongoose';


const like = new express.Router();

like.post('/like/:id', checkAuth, async (req, res) => {
    try {
        const user = await req.user;
        const id = await req.params.id;
        const post = await postCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });

        post.like.unshift(user.username)

        const result = await post.save();

        console.log(post);

        res.send({ msg: "liked" });

    } catch (e) {
        res.send(e)
    }
});

export default like;