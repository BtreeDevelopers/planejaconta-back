const MONGO_URL = process.env.MONGO_URL || "";
const PORT = process.env.PORT || 3000;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC || "";
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE || "";

export {
  MONGO_URL,
  PORT,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE,
};
