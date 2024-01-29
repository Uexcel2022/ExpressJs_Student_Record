const app = require("./index");
const dotevn = require("dotenv");
dotevn.config({ path: "./config/config.env" });
const mongoose = require("mongoose");
mongoose
  .connect(process.env.LOCAL_CONN_STR)
  .then((conn) => {
    console.log("DB connection is successfull");
  })
  .catch((err) => {
    console.log("DB connection faild...");
  });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
