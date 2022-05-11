const express = require('express');

const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

// @route POST api/auth/register
// @desc Resgister user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
    try {
        //Check if extinct username
        const user = await User.findOne({ username })

        if (user) res.status(400).json({ success: false, message: 'Username already took!' })
        //All okay

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({ username, password: hashedPassword })
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ success: true, message: 'User added successfully!', accessToken });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: 'Interval server error' })
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simply validattion
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })

    try {
        // Is username valid?
        const user = await User.findOne({ username })

        if (!user)
            return res.status(400).json({ success: false, message: 'Username and/or password incorrect' })

        // Username found
        const passwordValid = await argon2.verify(user.password, password)

        if (!passwordValid) res.status(400).json({ success: false, message: 'Username and/or password incorrect' })

        // All okay

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'Login success!', accessToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Interval server error' })
    }
})

module.exports = router;