import express from 'express'
import {
    getAllProducts,
    getSingleProduct,
    addReview,
    deleteReview,
    getOnlyReviewsOneProduct,
    createProduct,
    updateSingleProduct,
    deleteSingleProduct,
    getFilterProduct,
    filterProducts
} from '../controllers/productControllers.js'
import { isLoggedIn } from '../middlewares/auth.js'


const router = express.Router()


router.get('/products', getAllProducts);
router.get('/product/:id', getSingleProduct);

router.put('/review', isLoggedIn, addReview);
router.delete('/review', isLoggedIn, deleteReview);
router.get('/reviews', getOnlyReviewsOneProduct);
router.get('/category/:id', getFilterProduct);

router.post('/advancefilter', filterProducts)


// admin route
router.post('/product', isLoggedIn, createProduct);


router.put('/product/:id', isLoggedIn, updateSingleProduct);
router.delete('/product/:id', isLoggedIn, deleteSingleProduct);



export default router