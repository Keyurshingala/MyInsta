import express from 'express';
import userCollection from '../models/signupModel.js';

const signup = new express.Router();

signup.post('/signup', async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        const userData = new userCollection(req.body)

        userData.updatedAt = Date.now()

        await userData.generateAuthToken()

        const result = await userData.save()

        // console.log("res: ", result)
        // console.log(res)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log("signup error");
        console.log(error);

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

export default signup


