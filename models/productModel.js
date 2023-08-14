import mongoose from 'mongoose'

const { Schema, model} = mongoose

const productSchema = new Schema({
    name : {
        type : String,
        required : [true,"Please enter product name"],
        trim : true,
        maxLength : [120, "Product name should not be greater than 120 characters"],
        unique: true
    },
    description : {
        type : String,
        required : [true,"Please enter description of product"],
    },
    price : {
        type : Number,
        required : [true,"Please enter price of product"],
        maxLength : [6, "Product name should not be greater than 6 digits"]
    },
    photos : {
        type : [String],
        required : [true,"Please enter photos"]
    },
    
    stock : {
        type : Number,
        required : true,
    },
    


    category : {
        type :String,
        required : [true,"Please enter category from following - Tshirt, Shirt, Hoodie, Bottom, Anime, Faded, Caps"],
        enum : {
            values : [
                'tshirt',
                'shirt',
                'anime',
                'bottom',
                'track-pants',
                'polo',
                'cap',
                'shorts',
                'faded',
                'dress'
            ],

            message : "Please select categories from give one only"
        }
    },

    brand : {
        type : String,
        required : [true,"Please enter brand name"]
    },

    size : {
        type : String,
        required : [true,"Please enter size"],
        enum : {
            values : [
                's',
                'm',
                'l',
                'xl',
                'xxl',
                'xxxl'
            ],

            message : "Please select size from give one only"
        }
    },

    color : {
        type: [String],
        required : true,
        enum : {
            values : [
                'blue',
                'black',
                'red',
                'gray',
                'peach',
                'green',
                'white',
                'pink',
                'brown',
                'indigo'
            ],
            message : "Please select size from give one only"
        }
    },

    ratings : {
        type : Number,
        // required : [true,"Please enter rating name"]
    },

    numberOfReviews : {
        type : Number,
        default : 0,
    },

    reviews : [
        {
            user : {
                type : Schema.ObjectId,
                ref : 'User',
                required : true,
                //it means user object Id
            },
            name : {
                type : String,
                required : true,
            },
            review : {
                type : Number,
                required : true,
            },
            comment : {
                type : String,
                required : true,
            }
        }
    ],

    user : {
        type : Schema.ObjectId,
        required : true,
        ref : 'User'
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Product = model('product',productSchema)


export default Product