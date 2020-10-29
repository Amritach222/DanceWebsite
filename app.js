const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 80;
//EXPRESS_SPEIFIC_STUFF
app.use('/static', express.static('static')); // for serving static file 
app.use(express.urlencoded()); // for transforming data between pug and express

//PUG_SPECIFIC_STUFF
app.set('view engine', 'pug'); //set the templete engine as pug
app.set('views', path.join(__dirname, 'views')); // set the view directory
//ENDPOINTS

// Creating schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
// Creating Model
var Contact = mongoose.model('Contact', contactSchema);
app.get('/', (req, res) => {

    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {

    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send("This item has been sent to the database.")
    }).catch(() => {
        res.status(404).send("Item was not save to the database.")
    });

    // const params = {};
    // res.status(200).render('contact.pug', params);
});



//START THE SERVER
app.listen(port, () => {
    console.log(`This app runs successfully on port  ${port}`);
});