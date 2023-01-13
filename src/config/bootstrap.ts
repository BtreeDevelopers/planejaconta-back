import { config } from "dotenv";

const boot = new Promise((resolve) => {
  switch (process.env.NODE_ENV) {
    case "development":
      resolve(config({ path: ".env" }));
      resolve(require("./constants"));
      break;
    case "test":
      resolve(config({ path: ".env.test" }));
      resolve(require("./constants"));
      break;
    default:
      resolve(config({ path: ".env" }));
      resolve(require("./constants"));
      break;
  }
});

export default boot;
