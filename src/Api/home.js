import express from "express";
import postCollection from "../models/postModel.js";
import userCollection from "../models/signupModel.js";

const home = new express.Router();

home.get('/home', async (req, res) => {
    try {
        let auth = req.get("auth")
        let user = await userCollection.findOne({ token: auth })

        if (user != null) {
            let post = await postCollection.find()

            res.status(200).json(post)

        } else {
            res.status(404).json("invalid credential")
        }
    } catch (e) {
        console.log(e);
        res.send(e)
    }
})

export default home