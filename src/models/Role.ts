import { model, Document, Schema } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

export interface Role extends Document {
  name: string
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { toObject: { virtuals: true } }
)

RoleSchema.plugin(uniqueValidator)

RoleSchema.virtual("role", {
  ref: "User",
  localField: "name",
  foreignField: "role",
  count: true,
})

export default model<Role>("Role", RoleSchema)
