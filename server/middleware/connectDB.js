import { response } from "next-lesscode/functions";
import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
    return handler(req, res);
  } catch (error) {
    response(res, 500);
    console.log("DB Connection Error: ", error.message);
  }
};

export default connectDB;
