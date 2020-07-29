require('dotenv').config()
const router = require('express').Router();

const Users = require("./users-model.js");
const Classes = require('../classes/classes-model.js')

//add a user WORKS
router.post('/registeruser', validateUser, (req, res) => {
  const userData = req.body
  Users.insert(userData)
  .then (result => {
    res.status(201).json(result)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: "User could not be created." })
  })
});

//find all the users WORKS
router.get("/", (req, res) => {
  Users.find()
  .then(users => {
    res.status(200).json({users, jwt: req.jwt })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error getting the users" })
  })
});

//find the users by id WORKS
router.get('/:id', validateUserId, (req,res) => {
  Users.findById(req.params.id)
  .then(user => {
    res.status(200).json({users, jwt: req.jwt })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "User ID could not be found"})
  })
});

//update a user WORKS
router.put('/:id', validateUserId, (req, res) => {
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

//delete a user WORKS
router.delete("/:id", validateUserId, (req, res) =>{
  Users.remove(req.params.id)
  .then(user => {
    res.status(204).json({ message: `${user} successfully deleted.` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the user" })
  })
});

//USER can see their class list

router.get('/:id/classes', req,res => {
  Users.getClassesById(req.params.id)
  .then(classes => {
    !classes[0] ? res.status(404).json({ message: "User with that ID does not exist" }):
    res.status(200).json({ data: classes, jwt: req.jwt });
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Information could not be found", error: error.message })
  })
})
//USER can add a class to their account

//USER can delete a class freir account


//middleware validation WORKS
function validateUser(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  !username ? res.status(400).json({ message: "missing required username field" }):
  !password ? res.status(400).json({ message: "missing required password field" }):
  !email ? res.status(400).json({ message: "missing required email field" }):
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