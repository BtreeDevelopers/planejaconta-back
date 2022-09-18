"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("./AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  handleError: (error, _request, response, _next) => {
    console.log(error);

    if (error instanceof _AppError.default) {
      return response.status(error.statusCode).json(error);
    }

    return response.status(500).json({
      message: "Internal Server Error."
    });
  }
};
exports.default = _default;