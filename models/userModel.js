import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import validator from 'validator'

dotenv.config()


const { Schema, model } = mongoose


const userSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Please enter your full name'],
        maxLength : [40, 'Name should be less than 40 characters'],
    },

    email : {
        type : String,
        required : [true, 'Please enter your email address'],
        validators : [validator.isEmail, "Please enter email in correct format"],
        unique : true,
    },

    password : {
        type: String,
        required : [true, 'Please enter your password'],
        minLength : [7,'Password length should be greater than 7 characters'],
        select : false,        
    },

    photo : {
        id : {
            type : String,
            required : true
        },
        secure_url : {
            type : String,
            required : true
        }
    },


},{timestamps : true})



const User = model('userSchema', userSchema)

export default User