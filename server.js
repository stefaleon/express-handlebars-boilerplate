const express = require('express');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});


app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: 'This is the Home Page!'		
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