import { jwtVerify, response } from "next-lesscode/functions";

const verifyUser = (handler) => async (req, res) => {
  try {
    const cookies = req.headers?.cookies || req.cookies;
    const user = cookies["token"];

    const data = jwtVerify(user);
    if (!data) {
      response(res, 403);
      return;
    }
    req.id = data.id;
    req.user = data;

    return handler(req, res);
  } catch (error) {
    response(res, 500);
  }
};

export default verifyUser;
