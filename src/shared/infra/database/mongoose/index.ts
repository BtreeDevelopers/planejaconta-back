import mongoose from "mongoose";

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}`
  );
  