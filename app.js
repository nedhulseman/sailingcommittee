

var app = require('express')();
/*var http = require('http').createServer(app);*/
var io = require('socket.io')(http);
const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');


const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

dotenv.config({ path: './.env' })

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))
app.use(express.urlencoded({ extended: 'false' }))
app.use(express.json())

app.set('view engine', 'hbs')

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/auth/register", (req, res) => {
    const { name, email, password, password_confirm } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
        }

        if (result.length > 0) {
            return res.render('register', {
                message: 'This email is already in use'
            })
        } else if (password !== password_confirm) {
            return res.render('register', {
                message: 'Password Didn\'t Match!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)

        db.query('INSERT INTO users SET?', { name: name, email: email, password: hashedPassword }, (err, result) => {
            if (error) {
                console.log(error)
            } else {
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })
    })
})

app.listen(5000, () => {
    console.log("server started on port 5000")
})


/*
http.listen(PORT, function () {
    console.log('listening on *: ' + PORT);
});
var users_count = 0;
var upvote_count = 0;
var users = {};
class RoboBoat {
    constructor(lat, lon, socket_id) {
        this.lat = lat
        this.lon = lon
        this.userid = null
        this.socket_id = socket_id
        this.colors = ['blue', 'blue', 'red', 'green', 'purple']
        //this.color = this.colors[user_num];
        this.color = 'blue';
        this.random = 0
        this.geo_fence_lat = .0004
        this.step_size = .001
        this.location_history = []
    }
    updateLocation(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.location_history.push([this.lat, this.lon]);
    }

}
io.on('connection', function (socket) {
    console.log('a user has connected!');
    users[socket.id] = new RoboBoat(0, 0, socket.id);
    io.emit('connection');

    socket.on('disconnect', function () {
        delete users[socket.id]
    });


    setInterval(function () {
        io.emit('request-location');
    }, 20000);
    socket.on('get-location', function (socket_id, location) {
        console.log(socket_id, location);
        users[socket_id].updateLocation(location[0], location[1]);
        io.emit('push-location-html', users);
    });
});
*/
