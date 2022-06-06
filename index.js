const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const authentication = require('./authentication');
const express = require('express');
const helmet = require('helmet');
const Joi = require('joi');
const port = process.env.PORT || 3000;
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');

//optional
app.set('views', './views'); //default root:views

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //original
console.log(`app: ${app.get('env')}`); //use this way returns development

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//configuration
console.log(`Application Name: ` + config.get('name'));
console.log(`Mail Server: ` + config.get('mail.host'));
console.log(`Mail Password: ` + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to database...');

app.use(authentication);

app.use(logger);

app.get('/', (req, res) => {
  //res.send('hello world!');
  res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
