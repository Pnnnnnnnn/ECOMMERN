import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);