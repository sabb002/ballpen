const express = require('express');
const rootController = require('../controllers/root.controller');
const postRouter = express.Router();

postRouter.get('/', rootController.getAllPosts)
postRouter.get('/q', rootController.getPostsByCategory)
postRouter.get('/:id', rootController.getPostById)
postRouter.post('/', rootController.createPost)
postRouter.put('/:id', rootController.updatePost);
postRouter.delete('/:id', rootController.deletePost);


module.exports = postRouter;