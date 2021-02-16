const express = require('express');
const mongoose = require('mongoose');// setup mongoose 
const routes = require('./routes') //installing the routes

//Connet to mongodb 
mongoose.connect("mongodb://localhost:27017/PosterAPI", {useNewUrlParser: true})
.then(()=>{
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

app.listen(5000, () => {
    console.log('Server running on port ', 5000)
    });
});