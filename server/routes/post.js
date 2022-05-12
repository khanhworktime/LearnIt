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
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        if (posts.length > 0) return res.json({ success: true, message: "Okay", posts })
        return res.json({ success: true, message: "Post is empty, lets learn" })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: "Interval server error" })
    }
})

// @router PUT api/posts
// @desc Update a post
// @access Private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title) return res.status(400).json({ success: false, message: 'Post title is missing' })

    let updatedPost = {
        title,
        description: description || '',
        url: url && (url.startsWith('https://') ? url : `https://${url}`) || '',
        status: status || "To learn",
        user: req.userId
    }

    // Update the post with postUpdateCondition
    const postUpdateCondition = { _id: req.params.id, user: req.userId }
    updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });

    // User not authorized to update post
    if (!updatedPost)
        return res.status(401).json({ success: false, message: "Post not found" })

    res.json({ success: true, message: "Post updated successfully!" })
})

// @router DELETE api/posts/
// @desc delete a post
// @access private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        if (!deletedPost) return res.status(401).json({ success: false, message: "Post not found!" })
        res.json({ success: true, message: "Post deleted successfully!", deletedPost })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, message: "Interval server error" })
    }

})

module.exports = router;