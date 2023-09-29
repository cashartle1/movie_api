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

//Users
let users = [
    {
        id: 1, 
        name: "Kim",
        favoriteMovies: ["The Princess Bride"]
    },
    {
        id: 2, 
        name: "joe", 
        favoriteMovies: []
    },
]

//Movies List
const movies = [
    {
        "Title": "The Princess Bride",
        "Description": "While home sick in bed, a young boy's grandfather reads him the story of a farm-boy-turned-pirate who encoutners numerous obstacles, enemies, and allies in his quest to reunite with his true love.",
        "Genre": {
            "Name":"Adventure",
            "Description": "Adventure film is similar to an Action film except that it is typically set in an exotic, far way, or unfamiliar locale. Like the the Action film genre, this is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include fighting, physical feats, rescues, and frantic chases. Action films tend to feature a mostly resourceful hero struggling against incredible odds, which include life-threating situations, a dangerous villian, or a pursuit which usually concludes in victory for the hero.",
        },
        "Director": {
            "Name": "Rob Reiner",
            "Description": "Rob Reiner was born in New York City in 1947 to actor-comedian-writer-producer Carl Reiner and singer Estelle Reiner. His inspiration to become a director  came from his mother, along with his father as his role model. When Rob graduated high school, his parents advised him to participate in Summer Theatre. Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania. He went on to UCLA Film School to further his education. Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family. He began his directing career with the Oscar-nominated films This Is Spinal Tap, Stand By Me, and The Princess Bride. He also has gone on to direct and produce several other successful box-office movies, become a political activist, and made cameo appearances on television. ",
            "Birth": 1947.0,
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
    {
        "Title": "",
        "Description": "",
        "Genre": {
            "Name":"",
            "Description": "",
        },
        "Director": {
            "Name": "",
            "Description": "",
            "Birth": "",
        } ,
        "ImageURL":"",
        "Featured":false
    }, 
];

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
