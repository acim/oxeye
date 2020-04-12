import bcrypt from "bcrypt";
import User from "../models/User";
import Role from "../models/Role";
import logger from "./logger";

export default async () => {
  try {
    const countRoles = await Role.countDocuments();
    if (!countRoles) {
      await Role.create(
        {
          name: "owner",
        },
        {
          name: "admin",
        },
        {
          name: "editor",
        },
        {
          name: "author",
        },
        {
          name: "contributor",
        },
        {
          name: "contributor",
        }
      );
    }

    const countUsers = await User.countDocuments();
    if (countUsers) {
      return;
    }

    const owner = await Role.findOne({ name: "owner" });

    const { generate } = await import("randomstring");
    const plainPwd = generate();
    const hashPwd = await bcrypt.hash(plainPwd, 10);
    logger.info(`creating admin user with password '${plainPwd}'`);
    await new User.create({
      firstName: "John",
      lastName: "Doe",
      username: "admin",
      email: "john.doe@example.com",
      password: hashPwd,
      role: owner.id,
    });
  } catch (err) {
    logger.error(err.message);
  }
};
