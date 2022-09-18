"use strict";

require("reflect-metadata");

require("express-async-errors");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

require("../../container");

require("../database/mongoose");

var _HandleError = _interopRequireDefault(require("../../errors/HandleError"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use(_HandleError.default.handleError);
module.exports = app;