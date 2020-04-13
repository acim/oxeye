import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { toObject: { virtuals: true } }
);

RoleSchema.plugin(uniqueValidator);

RoleSchema.virtual("role", {
  ref: "User",
  localField: "name",
  foreignField: "role",
  count: true,
});

export default mongoose.model("Role", RoleSchema);
