const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const Post = require('../models/Post');

// @route POST api/posts
// @desc create new post
// @access Private

router.post('/', verifyToken, async (req, res) => {

    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title) return res.status(400).json({ success: false, message: 'Post title is missing' })

    const newPost = new Post({
        title,
        description,
        url: (url.startsWith('https://') ? url : `https://${url}`),
        status: status || "To learn",
        user: req.userId
    })

    await newPost.save();

    return res.json({ success: true, message: 'Learning is on process!', post: newPost })
})

// @route GET api/post
// @desc GET all posts
// @access Private

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId });
        if (posts.length > 0) return res.json({ success: true, message: "Okay", posts })
        return res.json({ success: true, message: "Post is empty, lets learn" })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: "Interval server error" })
    }
})

module.exports = router;