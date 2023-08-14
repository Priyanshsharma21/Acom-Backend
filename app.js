import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'


const app = express()



// global middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended : true}))




// logging middleware
app.use(morgan("tiny"))
app.use(cors())



// cookies and file middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))



// testing route
app.get('/',(req,res)=>res.status(200).json({success : true, message : "Welcome to Apprikart Shop"}))



//routing middleware
app.use('/api/v1', userRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', productRoutes)
app.use('/api/v1', cartRoutes)



export default app