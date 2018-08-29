const express = require('express');
const mongoose = require('mongoose');
const postRouter = express.Router();
const Post = require('../models/post');



// Get all Posts
postRouter.get('/posts', (req, res, next) => {
	return Post.find().sort({ createdAt: 'descending'})
		.then((posts) => res.json({posts: posts.map(post => post.toJSON()) }))
		.catch(next);
	});

// Get one post by id
postRouter.get('/posts/:id', (req, res, next) => {
	return Post.findById( req.params.id, (err, post) => {
		if(err) {
			return res.sendStatus(404);
		} else if (post) {
			return res.json({post: req.post.toJSON()})
		}
	});
});

// Add a new Post
postRouter.post('/posts', (req, res, next) => {
	/*if (!req.body.post.title || !req.body.post.author || !req.body.post.body) {
		res.status(403).end();
	}*/
	const newPost = new Post(req.body);
	console.log(newPost)
	return newPost.save()
	.then(() => res.json({post: newPost.toJSON() }))
	.catch(next);
});

// Delete a post by id
postRouter.delete('/posts/:id', (req, res, next) => {
	return Post.findByIdAndRemove(req.params.id)
	.then(() => res.sendStatus(200))
	.catch(next);
}),

// Update a post by id
postRouter.put('/posts/:id', (req, res, next) => {
	return Post.findByIdAndUpdate(req.params.id, req.body.body)
	.then(() => res.json({post: req.post.toJSON() }))
	.catch(next);
});


module.exports = postRouter;