"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

const boot = new Promise(resolve => {
  switch (process.env.NODE_ENV) {
    case "development":
      resolve((0, _dotenv.config)({
        path: ".env.dev"
      }));
      resolve(require("./constants"));
      break;

    case "test":
      resolve((0, _dotenv.config)({
        path: ".env.test"
      }));
      resolve(require("./constants"));
      break;

    default:
      resolve((0, _dotenv.config)({
        path: ".env"
      }));
      resolve(require("./constants"));
      break;
  }
});
var _default = boot;
exports.default = _default;