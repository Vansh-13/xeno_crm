import mongoose from "mongoose";
const campaignSchema = mongoose.Schema({
  title: String,
  message: String,
  sent: Number,
  fail: Number,
  audienceSize: Number,
  segmentrule: Object,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Campaign",campaignSchema);