"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

class UUID {
  getV4() {
    return (0, _uuid.v4)();
  }

}

exports.default = UUID;