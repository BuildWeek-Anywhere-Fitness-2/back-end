require('dotenv').config()
const router = require('express').Router()

const Schedules = require('../schedules/schedules-model.js');
//const Classes = require('../classes/classes-model.js');


//add to schedule
router.post('/', (req, res, next) => {
  const classData = req.body
  Schedules.add(classData)
  .then (newClass => {
    res.status(201).json(newClass)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Schedule could not be created." })
  })
});

//get all classes schedules
router.get('/', (req, res, next) => {
  Schedules.find()
  .then(schedule => {
    res.status(200).json(schedule)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error getting the schedule data' })
  })
});

//get class schedule by id
router.get('/:id', (req, res, next) => {
  Schedules.findById(req.params.id)
  .then( theClass => {
    res.status(200).json({theClass})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'The schedule with that ID could not be found' })
  })
});




module.exports = router