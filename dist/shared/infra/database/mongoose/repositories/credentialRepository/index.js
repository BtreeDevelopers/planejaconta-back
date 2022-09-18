"use strict";

var _tsyringe = require("tsyringe");

var _CredentialRepository = _interopRequireDefault(require("./implementations/CredentialRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("CredentialRepository", _CredentialRepository.default);