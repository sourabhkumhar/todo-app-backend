import connectDB from "@/server/middleware/connectDB";
import cors from "@/server/middleware/cors";
import verifyUser from "@/server/middleware/verifyUser";
import Todo from "@/server/model/Todo";
import { allowedMethods, response } from "next-lesscode/functions";

const handler = async (req, res) => {
  if (allowedMethods(req, res, ["GET", "PUT", "DELETE"])) return;

  try {
    const { id } = req.query;
    const item = await Todo.findById(id);
    if (!item) {
      response(res, 404, "Todo is not available!");
      return;
    }

    if (req.method === "GET") {
      response(res, 200, "", { item });
      return;
    }

    if (req.method === "PUT") {
      const { task, id } = req.body;
      if (!id) {
        response(res, 500);
        return;
      }
      if (!task) {
        response(res, 401, "Task Requried");
        return;
      }
      const updatedItem = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        response(res, 500);
        return;
      }

      response(res, 200, "Item Updated");
      return;
    }

    if (req.method === "DELETE") {
      await Todo.findByIdAndDelete(id);
      response(res, 200, "Item Deleted Successfully");
      return;
    }
  } catch (error) {
    response(res, 500);
    console.log(error);
  }
};

export default cors(connectDB(verifyUser(handler)));
