import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userDataSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    fullName: {
        type: String,
        required: true
    },
    program: {
        type: String
    },
    mentor: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
},
    {
        timestamps: true
    });


userDataSchema.methods.generateJWT = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// userDataSchema.methods.comparePassword = async function (enteredPassword) {
//     return await compare(enteredPassword, this.password);
// };

const User = model('User', userDataSchema);
export default User;