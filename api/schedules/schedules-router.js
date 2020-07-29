require('dotenv').config()
const router = require('express').Router()

const Schedules = require('../schedules/schedules-model.js');
const Classes = require('../classes/classes-model.js');


//add to schedule
router.post('/' (req, res, next) => {
  const classData = req.body
  Schedules.add(classData)
  .then (newClass => {
    res.status(201).json(newClass)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Class could not be created." })
  })
});

//get all classes
router.get('/', (req, res, next) => {
  Classes.find()
  .then(classes => {
    res.status(200).json(classes)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error gettint the classes data' })
  })
});

//get class by id
router.get('/:id', (req, res, next) => {
  Schedules.findById(req.params.id)
  .then( theClass => {
    res.status(200).json({theClass})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'The class with that ID could not be found' })
  })
});

//update a class
router.put('/:id', validateClassById, (req, res, next) => {
  const changes = req.body
  Classes.update(req.params.id, changes)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error updating the class.' })
  })
});

//remove a class from schedule
router.delete('/:id', (req, res, next) => {
  Classes.remove(req.params.id)
  .then(theClass => {
    res.status(204).json({ message: `${theClass} was successfully deleted.` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the class." })
  })
});

module.exports = router