import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const TodoSchema = new Schema(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.todo || model("todo", TodoSchema);
