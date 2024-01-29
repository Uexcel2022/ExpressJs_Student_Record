const express = require("express");
const globalErrorHandler = require("./controller/errorController");
const app = express();
const studentRoutes = require("./route/studentRoutes");
app.use(express.json());
app.use("/api/v1/students", studentRoutes);
app.use(globalErrorHandler);
module.exports = app;
