const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
	secret: '5UNLrlnj7v',
	resave: false,
	saveUninitialized: false
}));

consign()
	.include('application/controllers')
	.then('application/views')
	.then('config/routes.js')
	.into(app);

module.exports = app;