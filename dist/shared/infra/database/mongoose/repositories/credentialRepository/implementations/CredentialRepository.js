"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("../../../../../../utils/uuid"));

var _Credential = _interopRequireDefault(require("../schemas/Credential"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CredentialRepository {
  async create({
    userId,
    password
  }) {
    const credential = await _Credential.default.create({
      _id: new _uuid.default().getV4(),
      userId,
      password
    });
    return credential;
  }

  async createWithTransaction({
    userId,
    password,
    session
  }) {
    const credential = await _Credential.default.create([{
      _id: new _uuid.default().getV4(),
      userId,
      password
    }], {
      session
    });
    return credential[0];
  }

  async activeToken({
    userId,
    token
  }) {
    await _Credential.default.findOneAndUpdate({
      userId
    }, {
      token,
      isTokenActive: true
    });
  }

  async updatePassword({
    token,
    password
  }) {
    await _Credential.default.findOneAndUpdate({
      token
    }, {
      password,
      isTokenActive: false
    });
  }

  async findByUserId(userId) {
    const credential = await _Credential.default.findOne({
      userId
    }).select("password");
    return credential;
  }

}

exports.default = CredentialRepository;