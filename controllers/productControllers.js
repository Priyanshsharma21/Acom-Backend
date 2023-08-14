   
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'



export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find().skip(skip).limit(limit);

        res.status(200).json({
            status: true,
            products: products,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const filterProducts = async (req, res) => {
  try {
    const { price, color, size, category, sorts } = req.body;

    console.log(price, color, size, category, sorts)

    let query = Product.find();

    // Apply filters
    if (price[0] && price.length > 0) {
        const maxPrice = parseInt(price[0]); 
        query = query.where('price').lte(maxPrice);
    }
    if (color[0] && color.length > 0) {
      query = query.where('color').in(color);
    }
    if (size[0] && size.length > 0) {
      query = query.where('size').in(size);
    }
    if (category[0] && category.length > 0) {
      query = query.where('category').in(category);
    }

    // Apply sorting
    if (sorts[0] && sorts.length > 0) {
      const sortOption = sorts[0]; // We assume only one sort option for simplicity
      if (sortOption === 'Low to High') {
        query = query.sort('price');
      } else if (sortOption === 'High to Low') {
        query = query.sort('-price');
      }else if (sortOption === 'Newest') {
        query = query.sort('-createdAt'); // Sort by createdAt in descending order
      }
    }


    const filteredAndSortedProducts = await query.exec();

    res.status(200).json({ success: true, products: filteredAndSortedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const getSingleProduct = async(req,res)=>{
    try {
        const {
            id
        } = req.params

        if (!id) res.status(400).json({
            status: false,
            message: "No productId found"
        })


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid UserId',
            });
        }

        const product = await Product.findById(id)

        if (!product) return res.status(404).json({
            status: false,
            message: "Product not found !!!"
        })

        res.status(200).json({
            status: true,
            message: "Success",
            product: product
        })
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}



export const addReview = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}



export const deleteReview = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}



export const getOnlyReviewsOneProduct = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}

export const getFilterProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const products = await Product.find({
            $or: [
                { name: { $regex: id, $options: 'i' } }, // Match in product name (case-insensitive)
                { description: { $regex: id, $options: 'i' } }, // Match in description (case-insensitive)
                { category: { $regex: id, $options: 'i' } }, // Match in category (case-insensitive)
                { brand: { $regex: id, $options: 'i' } }, // Match in brand (case-insensitive)
            ]
        });

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




export const createProduct = async(req,res)=>{
    try {

        const {
            name,
            description,
            price,
            photos,
            stock,
            category,
            brand,
            size,
            color,
            user
        } = req.body

        if (!name || !description || !price || !stock || !photos || !category || !brand || !size || !color || !user) return res.status(400).json({
            status: false,
            message: "Please enter all the required fields"
        })

        const isUser = await User.findById(user)

        if(!isUser) return res.status(404).json({status : false, message : "No User Found"})

        const product = await Product.create(req.body)

        res.status(201).json({
            status: true,
            message: "Success",
            data: product
        })


    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}



export const updateSingleProduct = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}




export const deleteSingleProduct = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success : false, message : error.message})
    }
}


