// Modules
const express = require('express');
const DBconnection = require('./utils/DBconncetion');
const app = express()

// utils
const DB_URI = 'mongodb://localhost:27017/social-media';
const port = 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

DBconnection(DB_URI) //Database connection stablishing

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'))

// app.get("/", (req, res)=> {
//     res.cookie("accessToken", token, {
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true
//     })
// })

app.listen(port, ()=> {
    console.log(`Server is listening at http://localhost:${port}`)
})