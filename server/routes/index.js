const express = require("express");
const userController = require("../controller/index");
const router = express.Router();

router

  .post("/", userController.createUser)
  .post("/scanQrcode", userController.scanQrcode)
  .post("/v1", userController.loginUser)
  .get("/", userController.getUser)
  .delete("/:id ", userController.deleteUser);

  exports.router = router