import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import User from "@/server/model/User";
import {
  allowedMethods,
  encryptSHA256,
  jwtSign,
  response,
} from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res, ["POST"])) return;

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      response(res, 401, "Credentials Required!");
      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      response(res, 400, "User not found!");
      return;
    }

    if (
      (email === user.email || email === user.username) &&
      user.password === encryptSHA256(password)
    ) {
      const data = {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        id: user._id,
      };

      response(res, 200, "Succsess! You logged in.", {
        data,
        isLoggedIn: true,
        token: jwtSign(data),
      });
    } else {
      response(res, 401, "Invalid Credentials!");
    }
  } catch (error) {
    response(res, 500, error.message);
  }
};

export default cors(connectDB(handler));
