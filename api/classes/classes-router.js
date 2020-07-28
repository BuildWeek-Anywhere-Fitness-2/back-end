require('dotenv').config()
const router = require('express').Router()

const Classes = require('../classes/classes-model.js');


//add a class WORKS (sorta says it doesn't create it but it is there)
//tried removing validation but same result
router.post('/register', validateClass, (req, res, next) => {
  const classData = req.body
  Classes.insert(classData)
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
router.get('/:id', validateClassById, (req, res, next) => {
  Classes.findById(req.params.id)
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

//remove a class
router.delete('/:id', validateClassById, (req, res, next) => {
  Classes.remove(req.params.id)
  .then(theClass => {
    res.status(204).json({ message: `${theClass} was successfully deleted.` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the class." })
  })
});

//middleware validation for classes

function validateClass(req, res, next) {
 
  const description = req.body.description;
  const name = req.body.name;
  const start = req.body.start;
  const end = req.body.end;


    !name ? res.status(400).json({ 
      message: "Missing required class name."
     }):
    !description ? res.status(400).json({
      message: "Missing required class description."
    }):
    !start ? res.status(400).json({ 
      message: 'Missing required class start time.'
    }):
    !end ? res.status(400).json({
      message: 'Missing required class end time.'
    }):
    next();
};

//need to fix???
function validateClassById(req, res, next) {
  Classes.findById(req.params.id)
  .then(resource => {
      if(resource){
        req.params = resource;
        next();
      }else{
        res.status(400).json({ message: 'Invalid class ID' })
      }
  })
  .catch(error => {
    console.log(error)
  })
};


module.exports = router