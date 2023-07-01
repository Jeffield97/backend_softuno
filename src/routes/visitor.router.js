const {
  getAll,
  create,
  getOne,
  remove,
  update,
  addNote,
} = require("../controllers/visitor.controller");
const verifyJWT = require("../utils/verifyJWT");
const express = require("express");

const visitorRoute = express.Router();

visitorRoute.route("/").get(getAll).post(verifyJWT, create);

visitorRoute
  .route("/:id")
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);
visitorRoute.route("/addNote/:id").put(verifyJWT, addNote);

module.exports = visitorRoute;
