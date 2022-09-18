"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.MONGO_URL = exports.JWT_PUBLIC_KEY = exports.JWT_PRIVATE_KEY = void 0;
const MONGO_URL = process.env.MONGO_URL || "";
exports.MONGO_URL = MONGO_URL;
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";
exports.JWT_PRIVATE_KEY = JWT_PRIVATE_KEY;
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || "";
exports.JWT_PUBLIC_KEY = JWT_PUBLIC_KEY;