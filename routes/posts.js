const router = require('express').Router();
const Posts = require('../models/posts');

//GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        posts ? res.status(200).json(posts) : res.status(400).json({ message: 'Something went wrong trying to get posts' });
    } catch(err) {
        res.status(500).json({ message: 'Problem getting all posts' });
    }
});

//GET one post by id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        post ? res.status(200).json(post) : res.status(404).json({ message: 'Could not find post' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem getting the post' });
    });
});

//POST a post
router.post('/new', async (req, res) => {
    try {
        const addPost = await Posts.create(req.body);
        addPecipe ? res.status(201).json(addPost) : res.status(400).json({ message: 'Something went wrong creating a recipe' });
    } catch(err) {
        res.status(500).json({ message: 'Problem creating new recipe' });
    }
});

//PUT a post
router.put('/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedPost => {
        updatedPost ? res.status(201).json(updatedPost) : res.status(404).json({ message: 'Could not find post to update' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Problem updating the post' });
    });
});

//DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        deletedPost ? res.status(201).json(deletedPost) : res.status(404).json({ message: 'Could not find the post to delete' });
    } catch(err) {
        res.status(500).json({ message: 'Problem deleting the post' });
    }
});

module.exports = router;