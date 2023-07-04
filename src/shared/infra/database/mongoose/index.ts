import mongoose from "mongoose";
const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
mongoose.connect(`${MONGO_PATH}`,{
  auth:{
    password:MONGO_PASSWORD,
    username:MONGO_USER
  },
  authSource:'admin'
});