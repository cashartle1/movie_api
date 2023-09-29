const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose');

const Models = require('./models.js');

const app = express();

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Directors

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/myFLixDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});
// app.get('/', (req, res) => {
//     res.send('Welcome to my app!');
// });

// CREATE - new users
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send ('users need names')
    }
})

// UPDATE - username/id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

// CREATE - add movie to user's favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user or movie found')
    }
})

// DELETE - remove movie from user's favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user or movie found')
    }
})

// DELETE - users to un-register
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

// READ
app.get("/movies", (req, res) => {
    res.status(200).json(movies);
});

// READ 
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('movie title not found')
    }
})

// READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name ===  genreName );

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('movie genre not found')
    }
})

// READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name ===  directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('movie genre not found')
    }
})



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
