import app from './app.js'
import * as dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

const { PORT, MONGODB_URL,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name : CLOUDINARY_CLOUD_NAME,
    api_key : CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET,
})



const startServer = async()=>{
    try {
        await connectDB(MONGODB_URL)
        app.listen(PORT, ()=>{
            console.log(`Running Up The Hill At ${PORT}km/hr`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()

