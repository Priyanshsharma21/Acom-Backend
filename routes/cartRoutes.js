import express from 'express';
import { addToCart,removeFromCart,getCartDetails } from '../controllers/cartControllers.js';

const router = express.Router();

router.get('/cart/:id', getCartDetails);
router.post('/cart/add', addToCart);
router.post('/cart/remove', removeFromCart);

export default router;