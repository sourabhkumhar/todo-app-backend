import setCookie from "@/server/functions/setCookies";
import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import verifyUser from "@/server/middleware/verifyUser";
import { allowedMethods, response } from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res, ["POST"])) return;

  try {
    const cookies = req.headers?.cookies || req.cookies;
    const token = cookies["token"];

    if (token) {
      setCookie(res, "token", token, -1);
    }

    response(res, 200, "", {
      isLoggedIn: false,
      data: null,
    });
  } catch (error) {
    response(res, 500);
  }
};

export default cors(connectDB(verifyUser(handler)));
