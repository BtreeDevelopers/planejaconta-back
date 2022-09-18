"use strict";

var _bootstrap = _interopRequireDefault(require("../../../config/bootstrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bootstrap.default.then(() => {
  const app = require("./app");

  app.listen(process.env.PORT || 3000, () => console.log(`Server is running on ${process.env.PORT || 3000}`));
});