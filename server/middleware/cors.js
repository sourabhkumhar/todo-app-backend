import { response } from "next-lesscode/functions";
const allowedOriginsProduction = "https://todo-frontend-webapp.vercel.app";

const allowedOriginsDevelopment = "http://localhost:3000";

const cors = (handler) => async (req, res) => {
  try {
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.NODE_ENV === "development"
        ? allowedOriginsDevelopment
        : allowedOriginsProduction
    );

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "0");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, DELETE, POST, PUT"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

    res.setHeader("Cache-Control", "private, no-cache, no-store");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    return handler(req, res);
  } catch (error) {
    response(res, 500);
    console.log("CORS Error: ", error.message);
  }
};

export default cors;
