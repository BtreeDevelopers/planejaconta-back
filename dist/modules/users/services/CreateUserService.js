"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository"));

var _ICredentialRepository = _interopRequireDefault(require("../../../shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _ICredentialRepository.default === "undefined" ? Object : _ICredentialRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(userRepository, credentialRepository) {
    this.userRepository = userRepository;
    this.credentialRepository = credentialRepository;
  }

  async execute({
    name,
    email,
    password
  }) {
    const session = await _mongoose.default.startSession();

    try {
      session.startTransaction();
      const user = await this.userRepository.createWithTransaction({
        name,
        email,
        session
      });
      await this.credentialRepository.createWithTransaction({
        password,
        userId: user._id,
        session
      });
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      throw new _AppError.default("Falha no registro do usuário.", 400);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;