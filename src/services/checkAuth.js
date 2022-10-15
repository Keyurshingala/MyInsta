import login from "../Api/login.js";
import userCollection from "../models/signupModel.js"


const checkAuth = async (req, res, next) => {
    try {
        // let isValid = await verifyJwt(auth)

        let auth = req.get("auth")
        let user = await userCollection.findOne({ token: auth })

        // console.log(user.username);

        if (user == null) {
            res.status(403).send({ status: false, message: "invalid credantial" });

        } else {
            req.user = user
            next();
        }

    } catch (e) {
        res.send(e)
    }
}

export default checkAuth