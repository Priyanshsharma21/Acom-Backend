import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'


export const isLoggedIn = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token) return res.status(404).json({status : false, messsage : "No Token Found"})

        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    msg: err.message
                })
            } else {
                const user = await User.findById(decodedToken.id)
                if(!user) res.status(401).json({status : false, message : "Please Logged In First."})
                req.decodedToken = decodedToken
                next()
            }
        });
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}