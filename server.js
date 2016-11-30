const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toUTCString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('capIt', (sometext) => {
	return sometext.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: 'This is the Home Page!',
		pageMessage: 'This is a message uppercased via the "capIt" hbs helper'		
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'This is the About Page!'		
	});
});

app.listen(PORT, process.env.IP, () => {
	console.log(`Server started on port ${PORT}.`);
});