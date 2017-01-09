const PORT = 8000 || process.env.PORT;
var mainRoute = require('./routes/index');
var productRoute = require('./routes/product');
var DB = "mongodb://localhost/vietsys";
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname + '/client')));
app.use(function (req, res, next) {
    if (req.originalUrl.includes('api') || req.originalUrl.includes('auth')) {
        next();
    } else {
        res.sendFile(__dirname + '/client/views/index.html');
    }
});

// app.use('/', mainRoute);
app.use('/api/product', productRoute);


mongoose.connect(DB, function(err){
    if(err){
        return err;
    } else {
        console.log('Successfully connected to ' + PORT);
    }
});

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)

app.listen(PORT, function(){
    console.log('Listening on port ' + PORT);
});


