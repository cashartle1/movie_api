const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

//Top Movies List
const topMoviesList = [
    {
        title: "movie 1",
        director: "director 1",
    }, 
    {
        title: "movie 2",
        director: "director 2",
    },
    {
        title: "movie 3",
        director: "director 3",
    },
    {
        title: "movie 4",
        director: "director 4",
    },
    {
        title: "movie 5",
        director: "director 5",
    },
    {
        title: "movie 6",
        director: "director 6",
    },
    {
        title: "movie 7",
        director: "director 7",
    },
    {
        title: "movie 8",
        director: "director 8",
    },
    {
        title: "movie 9",
        director: "director 9",
    },
    {
        title: "movie 10",
        director: "director 10",
    },
];

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});

app.get("/movies", (req, res) => {
    res.json(topMoviesList);
});

//requests for static files to the 'public' folder
app.use(express.static('public'));

//setup the logger
app.use(morgan('combined'));

//error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
