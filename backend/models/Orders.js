import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  items: {
    type: [
      {
        name: String,
        quantity: Number,
        price: Number
      }
    ],
    default: [] 
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const order = mongoose.model("Order", orderSchema);
export default order;
