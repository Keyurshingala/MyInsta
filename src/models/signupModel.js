import mongoose from "mongoose";
import validator from "validator";
import { hashPassword } from "../services/hashPass.js";
import { createJwt } from "../services/webToken.js";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 100,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
        }
    },

    mobile: {
        type: String,
        trim: true,
        unique: true,
        minLength: 10,
        maxLength: 10,
    },

    fullname: {
        type: String,
        trim: true,
        maxLength: 100,
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    isProfilePrivate: {
        type: Boolean,
        required: true,
        default: true
    },

    following: {
        type: [{
            type: String,
        }],
    },

    followers: {
        type: [{
            type: String,
        }],
    },

    bio: {
        type: String,
        trim: true,
    },

    createdAt: {
        type: Number,
        default: Date.now(),
        required: true,
    },

    updatedAt: {
        type: Number,
        required: true,
    },

    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    try {

        const token = await createJwt(this.name)

        this.tokens = this.tokens.concat({ token: token })

    } catch (error) {
        console.log("erro genrating token");
        res.status(400).json({
            error: error
        })
    }
}

userSchema.pre("save", async function (next) {
    console.log(this.password);

    if (this.isModified("password")) {
        this.password = await hashPassword(this.password)
    }
    next()
})

const userCollection = new mongoose.model(process.env.USER_COLLECTION, userSchema)
export default userCollection

