const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/Users");
require("dotenv").config();

const app = express();

mongoose
  .connect(
    // "mongodb+srv://waheguru1469:waheguru1469@cluster0.besop.mongodb.net/Assignment"
    process.env.MONGO_URI
  )
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
