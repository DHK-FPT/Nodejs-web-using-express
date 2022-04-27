const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get("/", userController.index);

router.get("/search", userController.search);

router.get("/create", userController.create);

router.get('/:id', userController.get);

router.post("/create", userController.postCreate);

module.exports = router;
