import { jwtVerify, response } from "next-lesscode/functions";

const verifyUser = (handler) => async (req, res) => {
  try {
    const { token } = req.query;

    const data = jwtVerify(token);
    if (!data) {
      response(res, 403);
      return;
    }
    req.id = data.id;

    return handler(req, res);
  } catch (error) {
    response(res, 500);
  }
};

export default verifyUser;
