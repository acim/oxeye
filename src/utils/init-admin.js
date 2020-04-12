import bcrypt from "bcrypt";
import User from "../models/User";
import logger from "./logger";

export default async () => {
  try {
    const countUsers = await User.countDocuments({});
    if (countUsers) {
      return;
    }

    const { generate } = await import("randomstring");
    const plainPwd = generate();
    const hashPwd = await bcrypt.hash(plainPwd, 10);
    logger.info(`creating admin user with password '${plainPwd}'`);
    const u = new User({
      firstName: "John",
      lastName: "Doe",
      username: "admin",
      email: "john.doe@example.com",
      password: hashPwd,
    });
    await u.save();
  } catch (err) {
    logger.error(err.message);
  }
};
