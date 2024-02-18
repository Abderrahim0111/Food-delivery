const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orders: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
        quantity: Number,
        price: Number,
      },
    ],
    city: String,
    address: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
