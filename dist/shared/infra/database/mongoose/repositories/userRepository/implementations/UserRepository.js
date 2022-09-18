"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("../../../../../../utils/uuid"));

var _User = _interopRequireDefault(require("../schemas/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  async create({
    name,
    email,
    profilePath
  }) {
    const user = await _User.default.create({
      _id: new _uuid.default().getV4(),
      name,
      email,
      profilePath
    });
    return user;
  }

  async createWithTransaction({
    name,
    email,
    profilePath,
    session
  }) {
    const user = await _User.default.create([{
      _id: new _uuid.default().getV4(),
      name,
      email,
      profilePath
    }], {
      session
    });
    return user[0];
  }

  async isEmailAvailable(email) {
    const user = await _User.default.findOne({
      email
    });
    return !user;
  }

  async findById(_id) {
    const user = await _User.default.findById(_id);
    return user;
  }

  async findByEmail(email) {
    const user = await _User.default.findOne({
      email
    });
    return user;
  }

}

exports.default = UserRepository;