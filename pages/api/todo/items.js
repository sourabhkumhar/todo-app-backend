import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import verifyUser from "@/server/middleware/verifyUser";
import Todo from "@/server/model/Todo";
import { allowedMethods, response } from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res)) return;

  try {
    const items = await Todo.find({ _userId: req.id });
    response(res, 200, "", { items });
  } catch (error) {
    response(res, 500, error.message);
  }
};

export default cors(connectDB(verifyUser(handler)));
