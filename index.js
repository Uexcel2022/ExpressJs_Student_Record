const Express = require("express");
const app = Express();
const studentRoutes = require("./route/studentRoutes");

app.use("/api/v1/students", studentRoutes);
module.exports = app;
