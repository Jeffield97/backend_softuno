const { getAll, create, getOne, remove, update } = require('../controllers/visitor.controller');
const express = require('express');

const visitorRoute = express.Router();

visitorRoute.route('/')
    .get(getAll)
    .post(create);

visitorRoute.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = visitorRoute;