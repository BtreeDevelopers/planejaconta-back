"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  profilePath: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false,
  autoCreate: true
});

var _default = (0, _mongoose.model)("User", UserSchema, "User");

exports.default = _default;