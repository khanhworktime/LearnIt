const express = require('express');

const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')
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

        if (user) return res.status(400).json({ success: false, message: 'Username already took!' })
        //All okay

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({ username, password: hashedPassword })
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ success: true, message: 'User added successfully!', accessToken });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: 'Interval server error' })
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

        if (!passwordValid) return res.status(400).json({ success: false, message: 'Username and/or password incorrect' })

        // All okay

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        return res.json({ success: true, message: 'Login success!', accessToken })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Interval server error' })
    }
})

// @route POST api/auth
// @desc check user are verify?
// @access public

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) return res.status(400).json({ success: false, message: 'User not found!' })

        return res.json({ success: true, user })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Interval server error' })

    }
})

module.exports = router;