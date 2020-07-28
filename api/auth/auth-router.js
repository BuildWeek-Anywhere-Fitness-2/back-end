require('dotenv').config()
const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//check users and trainers
const Users = require('../users/users-model.js')
const Trainers = require('../trainers/trainers-model.js')

const { isUserValid, isTrainerValid } = require('./validate.js')

//users WORKS
router.post('/registeruser', (req, res) => {
  const credentials = req.body;


  if (isUserValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.insert(credentials)
    .then(user => {
   
      const token = makeToken(user);
      
      res.status(201).json({ data: user, token });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'There was an error getting a token', error: error.message })
    })
  } else {
    res.status(400).json({ message: 'Please provide a valid username and password' })
  }
});

// //trainer WORKS
router.post('/registertrainer', (req, res) => {
  const credentials = req.body;

  if (isTrainerValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Trainers.insert(credentials)
    .then(trainer => {
      const token = makeToken(trainer);
      res.status(201).json({ data: trainer, token });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error.message)
    })
  } else {
    res.status(400).json({ message: 'Please provide a valid trainer username and password' })
  }
});

// user login WORKS
router.post('/userlogin', (req, res) => {
  const {username, password } = req.body;

  if (isUserValid(req.body)) {
    Users.findBy({ username: username })
    .then(([user]) => {
      console.log('user', user);
      if(user && bcryptjs.compareSync(password, user.password)) {
        const token = makeToken(user); //make new token for user

        res.status(200).json({ message: "Here is your token", token })
      } else {
        res.status(401),json({ message: 'Your user credentials are invalid.' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error logging in the user', error: error.message })
    });
  } else {
    res.status(400).json({ message: "Please provide a valid username and password. " });
  }
});


// //trainer login WORKS
router.post('/trainerlogin', (req, res) => {
  const {name, password } = req.body;

  if (isTrainerValid(req.body)) {
    Trainers.findBy({ name: name })
    .then(([trainer]) => {
      console.log('trainer', trainer);
      if(trainer && bcryptjs.compareSync(password, trainer.password)) {
        const token = makeJwt(trainer); //make new token for trainer

        res.status(200).json({ message: "Here is your token", token })
      } else {
        res.status(401),json({ message: 'Your trainer credentials are invalid.' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error logging in the trainer', error: error.message })
    });
  } else {
    res.status(400).json({ message: "Please provide a valid trainer name and password. " });
  }
});

//token user 

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET
  const options = {
    expiresIn: '1h' //token expires in an hour
  };
  return jwt.sign(payload, secret, options);
}

//token trainer

function makeJwt(trainer) {
  const payload = {
    subject: trainer.id,
    name: trainer.name
  };

  const secret = process.env.JWT_SECRET
  const options = {
    expiresIn: '1h' //token expires in an hour
  };
  return jwt.sign(payload, secret, options);
}

//logout
router.get("/logout", (req, res) => {
  if (req.jwt) {
   req.jwt.destroy(err => {
      if (err) {
        res.status(500).json({ message: "unable to log out" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});



module.exports = router