"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthUserService = _interopRequireDefault(require("../../services/AuthUserService"));

var _CreateUserService = _interopRequireDefault(require("../../services/CreateUserService"));

var _FindUserService = _interopRequireDefault(require("../../services/FindUserService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async store(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    await createUserService.execute({
      name,
      email,
      password
    });
    return response.status(201).json({
      message: "Usuário criado com sucesso."
    });
  }

  async find(request, response) {
    const {
      user_id
    } = request.params;

    const findUserService = _tsyringe.container.resolve(_FindUserService.default);

    const user = await findUserService.execute(user_id);

    if (user) {
      return response.status(201).json({
        user
      });
    }

    return response.status(204).end();
  }

  async auth(request, response) {
    const {
      email,
      password
    } = request.body;

    const authUserService = _tsyringe.container.resolve(_AuthUserService.default);

    const result = await authUserService.execute({
      email,
      password
    });
    return response.status(200).json(result);
  }

}

var _default = UserController;
exports.default = _default;