
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("../server/routes/index");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/register",  userRouter.router);
app.use("/login",  userRouter.router);




const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB);
  try {
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();




app.listen(process.env.PORT, () =>
  console.log(`server is ready ${process.env.PORT}`)
);