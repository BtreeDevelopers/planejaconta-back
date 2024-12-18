import boot from "@config/bootstrap";
import { Express } from "express";

boot.then(() => {
  const app = require("./app") as Express;
  app.listen(process.env.PORT || 3001, () =>
    console.log(`Server is running on ${process.env.PORT || 3000}.`)
  );
});
