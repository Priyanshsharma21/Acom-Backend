import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'


export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId }],
      });

      await newCart.save();
    } else {
      const existingCartItem = cart.items.find((item) => item.product.toString() === productId);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.items.push({ product: productId });
      }

      await cart.save();
    }

    res.status(200).json({ success: true, message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      const updatedItems = cart.items.filter((item) => item.product.toString() !== productId);
  
      cart.items = updatedItems;
      await cart.save();
  
      res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


  export const getCartDetails = async (req, res) => {
    try {
      const { id } = req.params

      const cart = await Cart.findOne({ user: id })
  
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }

      const populatedItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findById(item.product);
          return {
            ...item.toObject(),
            product: product.toObject(),
          };
        })
      );

      const totalPrice = populatedItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

  
      res.status(200).json({ success: true, cart : populatedItems, totalPrice });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };