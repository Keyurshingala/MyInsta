import mongoose from "mongoose";
import validator from "validator";

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        require: true
    },

    image: {
        type: String,
        required: true,
        unique: true,
    },

    des: Object,

    createdAt: {
        type: String,
        required: true,
        default: Date.now()
    },

    isPrivate: {
        type: Boolean,
        required: true,
        default: false
    },

    like: [String],

    comment: [String]

})

const postCollection = new mongoose.model(process.env.POST_COLLECTION, postSchema)
export default postCollection

