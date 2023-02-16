import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique:true},
        desc : {type: String, required: true},
        img : {type: String, required: true},
        category : {type: String, required: true},
        size : {type: Array, required: true},
        price : {type: Number, required: true}
    },
    {timestamps: true}
)

export default mongoose.model("Product", ProductSchema)