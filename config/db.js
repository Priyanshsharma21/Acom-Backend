import mongoose from 'mongoose'


export const connectDB = async(url)=>{
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Connected To Database")

    }catch(error){
        console.log(error)
    }
}