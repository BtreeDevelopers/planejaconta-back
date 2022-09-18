"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CredentialSchema = new _mongoose.Schema({
  _id: {
    type: String
  },
  userId: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  token: {
    type: String
  },
  isTokenActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false,
  autoCreate: true
});
CredentialSchema.pre("save", async function (next) {
  const hash = await _bcryptjs.default.hash(this.password, 10);
  this.password = hash;
  next();
});

var _default = (0, _mongoose.model)("Credential", CredentialSchema, "Credential");

exports.default = _default;