const Joi = require("joi");
const express = require("express");
const { valid } = require("joi");
const app = express();

app.use(express.json());

const validate = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    //400 bad request
    res.status(400).send(result.error.details[0].message);
    console.log(result);
    return "error";
  }
};

const lookUp = () => {};
const courses = [
  {
    id: 1,
    name: "course 1",
  },
  {
    id: 2,
    name: "course 2",
  },
  {
    id: 3,
    name: "course 3",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//POST
app.post("/api/courses", (req, res) => {
  const validation = validate(req, res);
  console.log(validation);
  if (validation === "error") {
    console.log("inside validation");
    return;
  }
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  // });

  // const result = schema.validate(req.body);
  // console.log(result);

  // if (result.error) {
  //   //400 bad request
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  const course = {
    id: courses.length + 1, //will be named by database
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//updating
app.put("/api/courses/:id", (req, res) => {
  // look up course
  //if not exising, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    console.log(course);
    res.status(404).send("The course with the given ID was not found");
  }
  //else: Validate
  //If invalid, return 400 - bad request
  const validation = validate(req, res);
  console.log(validation);
  if (validation === "error") {
    console.log("inside validation");
    return;
  }
  //update course
  course.name = req.body.name;
  //return the updated course
  res.send(course);
});

// /api/courses/1 => it would be api/courses/:id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    console.log(course);
    res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
