import express from "express";
import { verifyJwt } from "../services/webToken.js";

const home = new express.Router();

home.get('/home', async (req, res) => {
    try {
        let auth = req.get("auth")

        let isValid = await verifyJwt(auth)

        if (isValid) {
            
            //post of following of user date wise
        
        
            res.status(200).json("pass")

        } else {
            res.status(404).json("pass")

        }

    } catch (e) {
        console.log(e);
        res.send(e)
    }
})

export default home