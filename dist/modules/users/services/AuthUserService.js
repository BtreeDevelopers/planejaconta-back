"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../shared/infra/database/mongoose/repositories/userRepository/models/IUserRepository"));

var _IGenerateJWTProvider = _interopRequireDefault(require("../../../shared/providers/generateJWTProvider/models/IGenerateJWTProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _ICredentialRepository = _interopRequireDefault(require("../../../shared/infra/database/mongoose/repositories/credentialRepository/models/ICredentialRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("GenerateJWTProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ICredentialRepository.default === "undefined" ? Object : _ICredentialRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IGenerateJWTProvider.default === "undefined" ? Object : _IGenerateJWTProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthUserService {
  constructor(credentialRepository, userRepository, generateJWTProvider) {
    this.credentialRepository = credentialRepository;
    this.userRepository = userRepository;
    this.generateJWTProvider = generateJWTProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default("Falha na autenticação.", 400);
    }

    const credential = await this.credentialRepository.findByUserId(user._id);

    if (!credential) {
      throw new _AppError.default("Falha na autenticação.", 400);
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, credential.password);

    if (!passwordMatch) {
      throw new _AppError.default("Falha na autenticação.", 400);
    }

    const token = await this.generateJWTProvider.generate(user._id).catch(_error => {
      throw new _AppError.default("Falha na autenticação.", 400);
    });
    return {
      token,
      userId: user._id,
      name: user.name
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = AuthUserService;
exports.default = _default;