require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth')

const monUser = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${monUser.username}:${monUser.password}@mern-learnit.si7dk.mongodb.net/mern-learnit?retryWrites=true&w=majority`)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }

}

connectDB();

const app = express();

// Fix the http request
app.use(express.json());

app.use('/api/auth', authRouter);

const PORT = 5000;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });