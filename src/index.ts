import dotenv from "dotenv";
// Initialize dot env configuration
dotenv.config();

import express, { Request, Response } from "express";
import routes from "./app/routes";
import cors from "cors";
import { initDbConnection } from "./app/db/init";

const initAppConfig = () => {
  const app = express();

  var corsOptions = {
    origin: "http://localhost:8081",
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // simple route
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
  });

  // application routes
  app.use("/api", routes);

  // set port, listen for requests
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

// Initialize Db connection
initDbConnection.then((res) => {
  console.log(res);
  initAppConfig();
})
  .catch((e) => {
    console.log(e);

  })
