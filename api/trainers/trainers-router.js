require('dotenv').config()
const router = require('express').Router()

const Trainers = require('../trainers/trainers-model.js')
const Classes = require('../classes/classes-model.js')

//add trainer
router.post('/trainers/', validateTrainer, (req, res) => {
  Trainers.insert({ name: req.body.name })
  .then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Trainer account could not be created." })
  })
});

//find all trainers
router.get('/trainers/', (req, res) => {
  Trainers.find()
  .then(trainers => {
    res.status(200).json(trainers)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error getting the trainers' })
  })
});

//find trainer by id
router.get('/trainers/:id', validateTrainerId, (req, res) => {
  Trainers.findById(req.params.id)
  .then(trainer => {
    res.status(200).json(trainer)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Trainer ID could not be found' })  
  })
});

//update trainer
router.put('/trainers/:id', validateTrainerId, validateTrainer, (req, res) => {
  const changes = req.body;
  Trainers.update(req.params.id, changes)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error updating the trainer data' })
  })
});

//delete trainer
router.delete('/trainers/:id', validateTrainerId, (req,res) => {
  Trainers.remove(req.params.id)
  .then(trainer => {
    res.status(204).json({ message: `${trainer} successfully deleted.`})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'There was an error deleting the trainer.' })
  })
});

//trainer creates class

//trainer deletes class

//middleware validation
function validateTrainer(req, res, next){
  const body = req.body;
  const name = req.body.name;

  !body ? res.status(400).json({ message: "missing required trainer data" }):
  !name ? res.status(400).json({ message: "missing required trainer account name"}):
  next();
};

function validateTrainerId(req, res, next) {
  Trainers.findById(req.params.id)
  //resource is required parameters
  .then(resource => {
    if(resource){
      req.trainer = resource;
      next();
    } else {
      res.status(400).json({ message: 'Invalid trainer ID' })
    }
  })
  .catch(error => {
    console.log(error)
  })
};







module.exports = router