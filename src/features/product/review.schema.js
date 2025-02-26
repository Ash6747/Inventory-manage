import mongoose, {Schema} from "mongoose";
// const reviewSchema = new Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Product',
//         required: true,
//     },
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: true,
//     },
//     comment: {
//         type: String,
//         required: true,
//     },
//     },{
//     timestamps: true,
// });


export const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating: Number,
    comment: {
        type: String,
        required: true,
    }
},{
    timestamps:true,
});

const ReviewProduct = mongoose.model('Review', reviewSchema);
export default ReviewProduct;