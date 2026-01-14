import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },

    title: { type: String, required: true },
    img: { type: String, default: "" },

    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    status: {
      type: String,
      enum: ["ORDER_RECEIVED", "CONFIRMED", "ON_THE_WAY", "CANCELED", "REJECTED", "DELIVERED"],
      default: "ORDER_RECEIVED",
    },
  },
  { _id: true }
);

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // e.g. ORD12345
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: { type: [OrderItemSchema], default: [] },

    address: { type: AddressSchema, required: true },

    totalMRP: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
