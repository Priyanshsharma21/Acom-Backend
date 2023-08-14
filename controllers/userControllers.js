import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'



export const signUp = async (req,res) => {
    try {
        const {
            name,
            email,
            password,
            photo
        } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo, {
            folder: "appuser",
            width: 150,
            crop: "scale",
        })

        if (!email || !name || !password) {
            return res.status(400).json({
                status: false,
                message: "Please enter all required fields"
            })
        }

        const isUser = await User.findOne({email : email})

        
        if (isUser) return res.status(400).json({
            status: false,
            message: "Already have a account, Please Login to use app."
        })

        const hashedPassword = await bcrypt.hash(password, 10)
        const requestBody = {
            ...req.body,
            password: hashedPassword,
            photo: {
                id: photoUrl.public_id,
                secure_url: photoUrl.secure_url
            }
        }


        const user = await User.create(requestBody)


        res.status(201).json({status : true, user : user})

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const login = async (req,res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body)

        if(!email || !password) return res.status(400).json({
            status: false,
            message: "Please enter all required fields"
        })

        const user = await User.findOne({email : email}).select({password : 1})
        const foundUser = await User.findOne({email : email})

        
        if (!user) return res.status(404).json({
            status: false,
            message: "No User Found with this name, please signup first"
        })

        console.log(user)


        bcrypt.compare(password, user.password, function (err, isPassword) {
            if (err || !isPassword) {
                return res.status(400).json({
                    status: false,
                    message: 'Passwords do not match'
                });
            }

            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: '3d',
            })


            res.status(200).json({
                status: true,
                data: {
                    token: token
                },
                user : foundUser
            })

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




export const getSingleUser = async (req,res) => {
    try {
        const {
            id
        } = req.params

        if (!id) res.status(400).json({
            status: false,
            message: "No userId found"
        })


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid UserId',
            });
        }

        const user = await User.findById(id)

        if (!user) return res.status(404).json({
            status: false,
            message: "User not found !!!"
        })

        res.status(200).json({
            status: true,
            message: "Success",
            data: user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


