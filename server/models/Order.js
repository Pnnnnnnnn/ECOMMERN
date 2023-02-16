import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
            },
        ],
        amount: { type: Number , required: true},
        address: { type: Object, required: true },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "completed", "cancelled", "declined", "processing"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);