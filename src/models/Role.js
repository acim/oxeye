import mongoose from "mongoose";

export default mongoose.model(
  "Role",
  mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  })
);
