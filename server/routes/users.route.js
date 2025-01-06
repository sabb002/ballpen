const express = require('express');
const rootController = require('../controllers/root.controller');
const userRouter = express.Router();

userRouter.get('/', rootController.getAllUsers)
userRouter.post('/new', rootController.saveUserInfo);

module.exports = userRouter;