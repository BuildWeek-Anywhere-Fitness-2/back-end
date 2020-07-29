require('dotenv').config()
const router = require('express').Router();

const Users = require("./users-model.js");
//const Classes = require('../classes/classes-model.js')
const Schedules = require('../schedules/schedules-model')

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
  .then(users => {
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

//USER can see their class list WORKS
router.get('/:id/schedule', (req,res) => {
  Users.getScheduleById(req.params.id)
  .then(schedule => {
    !schedule[0] ? res.status(404).json({ message: "User with that ID does not exist" }):
    res.status(200).json({ data: schedule, jwt: req.jwt });
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Information could not be found", error: error.message })
  })
})


//Couldn't figure out this one yet
//USER can add a class to their account
// router.post('/:id/schedule', (req, res) => {
//   const userId = req.params.id
//   //const { trainer_id, class_id } = req.body //pull trainer id and class id with get request and programtically put it in there 
//   req.body.userId = userId //all params in 
//   Schedules.addClassSchedule(req.body)
//   .then( newClass => {
//     res.status(201).json({ newClass, message: "Class added" })
//   })
//   .catch( error => {
//     console.log(error.message)
//     res.status(500).json({ error, message: "There was an error adding the class." })
//   }) 
// })


//Couldn't figure out this one yet
// //USER can delete a class from account
// router.delete('/:id/schedule/:id', (req, res) => {
//   const { id } = req.params
//   Schedules.removeScheduledClass(id)
//   .then( deleteClass => {
//     res.status(204).json({ deleteClass, message: "Class deleted."})
//   })
//   .catch(error => {
//     console.log(error.message)
//     res.status(500).json({ error, message: "There was an error deleting the class."})
//   })
// })




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