import express from 'express'
import {
    createOrder,
    getLoggedInUserOrders,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder
} from '../controllers/orderControllers.js'
import { isLoggedIn } from '../middlewares/auth.js'



const router = express.Router()


router.post('/order/create', isLoggedIn, createOrder)
router.get('/order/myorder', isLoggedIn, getLoggedInUserOrders)
router.get('/orders', isLoggedIn, getAllOrders)

router.get('/order/:id', isLoggedIn, getOneOrder)

router.put('/order/:id', isLoggedIn, updateOrder)
router.delete('/order/:id', isLoggedIn, deleteOrder)




export default router