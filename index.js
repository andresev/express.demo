const express = require('express');
const Joi = require('joi');
const port = process.env.PORT || 3005;

const app = express();
app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'Typescript',
    course: 'Course 1',
  },
  {
    id: 2,
    name: 'Javascript',
    course: 'course 2',
  },
  {
    id: 3,
    name: 'CSS',
    course: 'course 3',
  },
];

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with this ID was not found');
  }
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    course: Joi.string().min(3),
  });

  console.log(schema);

  const result = schema.validate(req.body);
  if (result.error) {
    //400 is for bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    course: req.body.course,
  };
  courses.push(course);
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});