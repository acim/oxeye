import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import { isEmail } from "validator";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(
      this.password,
      process.env.BCRYPT_ROUNDS || 10
    );
    return next();
  } catch (err) {
    return next(err);
  }
});

// UserSchema.methods.assignRole = async (role) => {
//   const r = await this.model("Role").findOne({ name: role });
// };

export default mongoose.model("User", UserSchema);
