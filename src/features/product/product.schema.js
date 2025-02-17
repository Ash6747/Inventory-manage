import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name:String,
    price:Number,
    desc:String,
    inStock:String,
    imageUrl:String,
    category:String,
    sizes:String,
  }
);

// export default mongoose.model('Product', ProductSchema);
