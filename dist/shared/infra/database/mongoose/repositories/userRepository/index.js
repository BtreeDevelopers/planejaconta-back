"use strict";

var _tsyringe = require("tsyringe");

var _UserRepository = _interopRequireDefault(require("./implementations/UserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("UserRepository", _UserRepository.default);