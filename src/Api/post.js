import express from "express";
import path from "path";
import postCollection from "../models/postModel.js";
import userCollection from "../models/signupModel.js";

const post = new express.Router()

post.post('/post', async (req, res) => {
    try {
        let auth = req.get("auth")
        // let isValid = await verifyJwt(auth)
        let user = await userCollection.findOne({ token: auth })

        if (user != null) {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            //post of following of user date wise
            let sampleFile = req.files.image;
            let uploadPath = path.resolve('./src/images').toString() + '\\' + Date.now() + '.png';

            console.log(uploadPath);

            sampleFile.mv(uploadPath, async (err) => {
                if (err)
                    return res.status(500).send(err);

                const post = new postCollection()
                post.image = uploadPath
                post.userId = user._id
                post.isPrivate = user.isProfilePrivate

                const result = await post.save()

                console.log(result);

                res.status(200).json({
                    msg: "post uploded succesfully"
                })
            });
        } else {
            res.status(404).json("invalid credential")
        }
    } catch (e) {
        console.log(e);
        res.send(e)
    }
});

export default post

