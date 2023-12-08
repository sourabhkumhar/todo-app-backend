import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import { allowedMethods, jwtVerify, response } from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res)) return;
  const { token } = req.query;

  try {
    if (!token) {
      response(res, 200, "", {
        isLoggedIn: false,
        data: null,
      });
    } else {
      const data = jwtVerify(token);
      response(res, 200, "", {
        isLoggedIn: true,
        data,
      });
    }
  } catch (error) {
    response(res, 500, "", {
      isLoggedIn: false,
      data: null,
    });
    console.log(error.message);
  }
};

export default cors(connectDB(handler));
