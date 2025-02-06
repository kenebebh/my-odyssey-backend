import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected:",
      "Connection Host: " + connect.connection.host,
      "Connection Name: " + connect.connection.name
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
