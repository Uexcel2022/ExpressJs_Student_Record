const app = require("./index");
const dotevn = require("dotenv");
dotevn.config({ path: "./config/config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name + " " + err.message);
  console.log("uncaughtException occurred");
  console.log("Shutting downn...");
  process.exit(1);
});

mongoose.connect(process.env.LOCAL_CONN_STR).then((conn) => {
  console.log("DB connection is successfull");
});
// .catch((err) => {
//   console.log("DB connection faild...");
// });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name + " " + err.message);
  console.log("unhandledRejection occurred");
  console.log("Shutting downn...");
  process.exit(1);
});
