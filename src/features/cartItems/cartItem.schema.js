import mongoose from 'mongoose';

const CartItemSchema = mongoose.Schema(
  {
    productId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quntaty: Number
  }
);

export default mongoose.model('CartItem', CartItemSchema);
