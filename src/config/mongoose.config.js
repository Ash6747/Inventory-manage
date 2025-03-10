import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CategoryModel from '../features/product/category.schema.js';

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async ()=>{
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected using Mongoose');
        addCategories();
    } catch (error) {

        console.log("Error while connecting to DB");
        console.log(error);
    }
}

async function addCategories(){
    const categories = await CategoryModel.find(); 
    if(!categories || categories.length == 0){
        await CategoryModel.insertMany([
            {name: "Books"},
            {name: "Clothing"},
            {name: "Electronics"}
        ]);
    }
    console.log("Categories added");
}