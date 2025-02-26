import { ApplicationError } from '../../error-handler/applicationError.js';
import CategoryModel from './category.schema.js';
import Product from './product.schema.js'
import ReviewProduct from './review.schema.js';
import { ObjectId } from "mongodb";
// const mongoose = require('mongoose.Types');
// const ObjectId = mongoose.Types.ObjectId;
// const product = await Product.findById(mongoose.Types.ObjectId(productId));


class ProductRepository{
    async add(newProduct){
        try{
            newProduct.categories = newProduct.category.split(",").map(e=> e.trim());
            const productInstance = new Product(newProduct);
            const savedProduct = await productInstance.save();
            await CategoryModel.updateMany(
                {_id: {$in: newProduct.categories}},
                {
                    $push: { product: new ObjectId(savedProduct._id) }
                }
            )
            return newProduct;
            // return newProduct
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async getAll(){
        try{
            const products = await Product.find();
            return products;
           
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async get(id){
        try{
            const product  = await Product.findById(id);
            return product;
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    // Product hosuld have min price specified and category
    async filter(minPrice, categories){
        try{

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async rate(userId, productId, rating, comment){
        try {
            const product = await Product.findById(productId);
            if(!product){
                throw new Error("Product Not Found");
            }
            const oldReview = await ReviewProduct.findOne({
                product: new ObjectId(productId),
                user: new ObjectId(userId)
            });

            if(oldReview){
                oldReview.rating = rating || oldReview.rating;
                oldReview.comment = comment || oldReview.comment;
                await oldReview.save();
            }else{
                const review = new ReviewProduct({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating: rating,
                    comment: comment
                });
                await review.save();

                product.reviews.push(review._id);
                await product.save();

            }
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }


}

export default ProductRepository;