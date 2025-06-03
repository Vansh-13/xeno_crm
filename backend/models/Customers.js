
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  totalSpend: {
    type: Number,
    default: 0
  },
  visits: {
    type: Number,
    default: 0
  },
  lastVisit: {
    type: Date
  },
  lastActive: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const customers = mongoose.model("Customer", customerSchema);

export default customers;
