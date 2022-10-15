'use strict'

import express from 'express';
import checkAuth from '../services/checkAuth.js';
import postCollection from '../models/postModel.js';
import userCollection from '../models/signupModel.js';




const search = express.Router();


search.get('/search', checkAuth, async (req, res) => {
    try {
        const q = req.query.q
        console.log(q);

        let result
        if (q.startsWith('#')) {
            result = await postCollection.find({ "des.tag": q })
        } else {
            result = await userCollection.find({ username: q })
        }

        if (result.length == 0) {
            res.status(200).send({ msg: "match not found" })
        } else
            res.status(200).send(result)

    } catch (e) {
        res.send({ error: e.toString() });
    }
});


export default search;