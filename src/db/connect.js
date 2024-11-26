import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log(
      `MONGODB CONNECTION SUCCESSFULL! on ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`xxxxx MONGODB CONNECTION FAILED!! ${error}`);
  }
};
