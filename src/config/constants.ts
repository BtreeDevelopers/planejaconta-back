const MONGO_PATH = process.env.MONGO_PATH || "";
const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const PORT = process.env.PORT || 3000;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC || "";
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE || "";
const SENHASUPERSECRETA = process.env.SENHASUPERSECRETA || "";


export {
  SENHASUPERSECRETA,
  MONGO_PATH,
  MONGO_USER,
  MONGO_PASSWORD,
  PORT,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE,
};
