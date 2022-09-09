/**
 * Basic express setup
 */

// 1. import express package
const express = require('express');
// 2. start server
const app = express();
// 3. make server listen to port 3000
app.listen(3000, () => {
    console.log('listening on port 3000...');
});

/**
 * Basic ejs setup
 */

// 1. let express know to use ejs
app.set('view engine', 'ejs');
// 2. make views folder accessible from everywhere
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

/**
 * Basic mongoose setup
 */
// 1. import mongoose
const mongoose = require('mongoose');
// 2. connect to the database named yelp-camp
mongoose.connect('mongodb://localhost:27017/yelp-camp');
// 3. check if mongoose connected to mongodb
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('database connected');
});

/**
 * Check if express & ejs work with each other
 */
app.get('/', (req, res) => {
    res.render('home');
});

const Campground = require('./models/campground');

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My Backyard',
        description: 'Cheap Camping'
    });
    await camp.save();
    res.send(camp);
});