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
          name: "administrator",
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
          name: "subscriber",
        }
      );
    }

    const countUsers = await User.countDocuments();
    if (countUsers) {
      return;
    }

    const { generate } = await import("randomstring");
    const password = generate();
    logger.info(`creating admin user with password '${password}'`);
    await User.create({
      firstName: "John",
      lastName: "Doe",
      username: "admin",
      email: "john.doe@example.com",
      password,
      role: "owner",
    });
  } catch (err) {
    logger.error(err.message);
  }
};
