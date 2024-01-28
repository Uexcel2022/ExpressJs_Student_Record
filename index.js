const express = require("express");
const app = express();
const studentRoutes = require("./route/studentRoutes");
app.use(express.json());
app.use("/api/v1/students", studentRoutes);
module.exports = app;
