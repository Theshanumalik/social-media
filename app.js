// Modules
const cookieParser = require('cookie-parser');
const express = require('express');
const DBconnection = require('./utils/DBconncetion');
const cors = require('cors')
const { MONGO_URI, PORT } = require('./utils/globalVariables');
const app = express()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


DBconnection(MONGO_URI) //Database connection stablishing

// Routes
app.use((req, res,next)=> {
    res.header('Access-Control-Allow-Credentials', true);
    next()
})
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'))
app.use('/api/comment/', require('./routes/comment'))
// app.get("/", (req, res)=> {
//     res.cookie("accessToken", token, {
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true
//     })
// })

app.listen(PORT, ()=> {
    console.log(`Server is listening at http://localhost:${PORT}`)
})