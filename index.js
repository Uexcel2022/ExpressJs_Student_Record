const express = require("express");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controller/errorController");
const app = express();
const studentRoutes = require("./route/studentRoutes");

app.use(express.json());
app.use("/api/v1/students", studentRoutes);

app.all("*", (req, resp, nex) => {
  const msg = ` Can't find ${req.originalUrl} on the server!`;
  const err = new CustomError(msg, 404);
  return nex(err);
});

app.use(globalErrorHandler);
module.exports = app;
