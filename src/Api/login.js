import express from 'express';
import userCollection from '../models/signupModel.js';
import { verify } from '../services/hashPass.js';

const login = new express.Router();

login.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await userCollection.findOne({ username: username })

        // console.log(result);

        if (result !== null) {

            const isPassMatched = await verify(password, result.password)
            if (isPassMatched) {

                res.status(200).json(result)
            } else {
                res.status(400).json({
                    error: `invalid login credentials`
                })
            }

        } else {
            res.status(400).json({
                error: `user with username ${username} is not registered`
            })
        }
    } catch (error) {
        console.log("login error");
        // console.log(error);

        let msg
        switch (error.code) {
            case 11000:
                msg = `${Object.keys(error.keyPattern)} is alredy in use`
                break;

            default:
                msg = error
        }

        res.status(400).json({
            error: msg
        })
    }
});

export default login


