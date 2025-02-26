import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    ]
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;