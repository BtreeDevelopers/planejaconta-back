"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routes = _interopRequireDefault(require("../../../../modules/users/infra/routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use("/user", _routes.default);
routes.get("/health-check", (_request, response) => response.status(200).json({
  uptime: Math.floor(process.uptime())
}));
var _default = routes;
exports.default = _default;