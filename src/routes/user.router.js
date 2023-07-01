const {
  getAll,
  register,
  getOne,
  remove,
  update,
  login,
} = require("../controllers/user.controller");
const express = require("express");

const userRoute = express.Router();

userRoute.route("/").get(getAll).post(register);

userRoute.route("/login").post(login);

userRoute.route("/:id").get(getOne).delete(remove).put(update);

module.exports = userRoute;
