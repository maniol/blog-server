const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true }, {useMongoClient: true})
	.then(() => console.log('connection to blog db successful'))
	.catch((err) => console.error(err));

mongoose.set('debug', true);


// Add models
require('./models/post');
// Add routes
const postRouter = require('./routes/post.routes.js')

app.use('/', postRouter);

const server = app.listen(3001, () => console.log('Server started on http://localhost:3001'));
