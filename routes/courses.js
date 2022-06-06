const express = require('express');
const Joi = require('joi');

const router = express.Router(); //express() itself won't work in different module

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

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with this ID was not found');
  }
  res.send(course);
});

router.post('/', (req, res) => {
  if (validateCourse(req, res)) {
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

router.put('/:id', (req, res) => {
  //look up course
  //if not existing, return 404
  const courseFound = courses.find((c) => c.id === parseInt(req.params.id));
  if (!courseFound) {
    res.status(404).send('Course was not found');
    return;
  }

  if (validateCourse(req, res)) {
    return;
  }
  //update course
  //return the updated course
  courseFound.name = req.body.name;

  res.send(courseFound);
});

router.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('Course was not found!');
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const validateCourse = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return true;
  }
};

module.exports = router;
