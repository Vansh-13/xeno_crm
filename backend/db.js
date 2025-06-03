import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
//is se hmko pta chlta hai ki current file kha hai but vo url formte m hotu h isliy usr fileurltopath se usko normal file path me convert
//karte h
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);  
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed: ", error.message);
    
  }
};

export default connectdb;
