import mongoose from "mongoose";
import logger from "./logger";

const db = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  logger().info(`connected to mongo host: ${conn.connection.host}`);
};

export default db;
