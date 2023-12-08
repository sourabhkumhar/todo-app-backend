import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import User from "@/server/model/User";
import {
  allowedMethods,
  encryptSHA256,
  response,
} from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res, ["POST"])) return;

  try {
    const { name, email, password } = req.body;
    if (!name) {
      response(res, 401, "Name is required!");
      return;
    }
    if (!email) {
      response(res, 401, "Email is required!");
      return;
    }
    if (!password) {
      response(res, 401, "Password is required!");
      return;
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      response(res, 401, "Email is already exist!");
      return;
    }

    const user = new User({
      name,
      email,
      password: encryptSHA256(password),
    });
    await user.save();

    response(res, 200, "Account created successfully!");
  } catch (error) {
    response(res, 500);
  }
};

export default cors(connectDB(handler));
