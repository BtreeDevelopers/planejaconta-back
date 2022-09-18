"use strict";

var _tsyringe = require("tsyringe");

var _GenerateJWTProvider = _interopRequireDefault(require("./implementations/GenerateJWTProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("GenerateJWTProvider", _GenerateJWTProvider.default);