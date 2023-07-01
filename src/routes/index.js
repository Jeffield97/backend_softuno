const express = require('express');
const userRoute = require('./user.router');
const visitorRoute = require('./visitor.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/user',userRoute)
router.use('/visitor',visitorRoute)


module.exports = router;