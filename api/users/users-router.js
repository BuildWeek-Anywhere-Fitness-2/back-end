require('dotenv').config()
const router = require('express').Router()

const Users = require("./users-model.js");
const Classes = require('../classes/classes-model.js')

//add a user
router.post('/users/', validateUser, (req, res) => {
  Users.insert({ username: req.body.username })
  .then (result => {
    res.status(201).json(result)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: "User could not be created." })
  })
});

//find all the users
router.get("/users/", (req,res) => {
  Users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error getting the users" })
  })
});

//find the users by id
router.get('/users/:id', validateUserId, (req,res) => {
  Users.findById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "User ID could not be found"})
  })
});

//update a user
router.put('/users/:id', validateUserId, validateUser, (req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error updating the user" })
  })
});

//delete a user
router.delete("/users/:id", validateUserId, (req, res) =>{
  Users.remove(req.params.id)
  .then(user => {
    res.status(204).json({ message: `${user} successfully deleted.` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the user" })
  })
});

//USER can add a class

//USER can delete a class


//middleware validation
function validateUser(req, res, next) {
  const body = req.body;
  const username = req.body.username;

  !body ? res.status(400).json({ message: "missing required user data" }):
  !username ? res.staus(400).json({ message: "missing required username field" }):
  next();
};

function validateUserId(req, res, next) {
  Users.findById(req.params.id)
  .then(resource => {
    if(resource){
      req.user = resource;
      next();
    } else {
      res.status(400).json({ message: 'Invalid user ID' })
    }
  })
  .catch(error => {
    console.log(error)
  })

};

module.exports = router