import { isEmail } from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
      type: String,
      enum: [
        "owner",
        "editor",
        "administrator",
        "author",
        "contributor",
        "subscriber",
      ],
      default: "user",
      required: true,
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

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function (expiresIn) {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
};

UserSchema.methods.assignRole = async function (role) {
  const r = await this.model("Role").findOne({ name: role });
  if (!r) {
    throw new Error(`role ${role} it not found`);
  }
  this.role = r.id;
  this.save();
};

export default mongoose.model("User", UserSchema);
