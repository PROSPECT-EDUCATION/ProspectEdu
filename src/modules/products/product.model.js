import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    // ✅ category filter will use this (Predefined OR "Other")
    category: { type: String, required: true },

    // ✅ when supplier enters a custom category, store here
    customCategory: { type: String, default: "" },

    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    outOfStock: { type: Boolean, default: false },

    images: [{ type: String }],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
