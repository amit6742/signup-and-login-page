
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("../server/routes/index");
const app = express();
require("dotenv").config();


const auth = ((req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    var decoded = jwt.verify(token,process.env.SECRET);
    console.log(decoded);
    if (decoded) {
      next();
    } else {
      
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(403).send(error);
  }
});

app.use(cors());
app.use(express.json());
app.use("/register",  userRouter.router);
app.use("/login",  userRouter.router);
app.use("/api", userRouter.router)




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