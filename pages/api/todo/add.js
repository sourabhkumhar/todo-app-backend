import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import verifyUser from "@/server/middleware/verifyUser";
import Todo from "@/server/model/Todo";
import { allowedMethods, response } from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res, ["POST"])) return;

  try {
    const { task } = req.body;
    if (!task) {
      response(res, 401, "Task Requried");
      return;
    }

    const item = new Todo({
      _userId: req.id,
      task,
    });
    await item.save();

    response(res, 200);
  } catch (error) {
    response(res, 500);
    console.log(error);
  }
};

export default cors(connectDB(verifyUser(handler)));
