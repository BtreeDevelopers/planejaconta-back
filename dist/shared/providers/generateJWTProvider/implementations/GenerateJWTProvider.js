"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../../../../config/constants");

class GenerateJWTProvider {
  async generate(userId) {
    if (!_constants.JWT_PRIVATE_KEY) {
      throw new Error("JWT_PRIVATE_KEY não encontrado.");
    }

    const token = (0, _jsonwebtoken.sign)({}, _constants.JWT_PRIVATE_KEY, {
      subject: userId,
      expiresIn: "4h"
    });
    return token;
  }

}

exports.default = GenerateJWTProvider;