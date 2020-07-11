const express = require("express");
const router = express.Router();

const Person = require("../../models/Person");

// @route GET api/persons
// @desc GET ALL persons
// @access Public
router.get("/", (req, res) => {
  Person.find().then((persons) => res.json(persons));
});

// @route POST api/persons
// @desc  Create new person
// @access PUBLIC
router.post("/", (req, res) => {
  const newPerson = new Person(req.body);

  newPerson
    .save()
    .then((person) => res.json(person))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// @route PATCH api/persons/:id
// @desc  update person
// @access PUBLIC
router.patch("/:id", (req, res) => {
  const patchPerson = Person.findById(req.params.id)
    .then((person) => {
      person.name = req.body.name || person.name;
      person.age = req.body.age || person.age;
      person.save().then((person) => res.json(person));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
