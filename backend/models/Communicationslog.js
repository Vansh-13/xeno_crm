import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Communication = mongoose.model("Communication", logSchema);
export default Communication;
