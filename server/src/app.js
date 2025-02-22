import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/api.js";
import logger from "./common/logger.js";

import middlewares from "./middlewares/middlewares.js";
import config from "./config/config.js";
const app = express();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(cors());

if (config.FILE_LOGGER == "true") {
  app.use(logger);
}

app.use(middlewares.responseMiddleware);

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.use("/", routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
