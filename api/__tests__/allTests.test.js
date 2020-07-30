//import what I need

const auth = require('../auth/auth-router.js')
const supertest = require('supertest')
const server = require('../../server.js');
const { expectCt } = require('helmet');
const { get } = require('../auth/auth-router.js');


//have an array of a dummy list of users, trainers, classes, schedules

const users = [
  {
    id: 1,
    username: 'usertest1',
    password: 'abcde',
    email: 'user@test.com',
    bio: 'bio here',
    schedule: {
        class1: "class 1",
        class2: "class2",
    }
  
  },
  {
    id: 2,
    username: 'usertest2',
    password: 'abcd',
    email: 'user2@test.com',
    schedule: {
      class1: "class 1",
  }
  },
  {
    id: 3,
    username: 'usertest3',
    password: 'abcde',
    email: 'user@test.com',
    schedule: {}
  },
];

const trainers = [
  {
    id: 1,
    name: 'trainertest1',
    password: 'abcde',
    email: 'trainer@test.com',
    bio: 'bio here'
  },
  {
    id: 2,
    name: 'trainertest2',
    password: 'abcd',
    email: 'trainer2@test.com',
  },
  {
    id: 3,
    name: 'trainertest3',
    password: 'abcde',
    email: 'trainer3@test.com',
    bio: null
  },
];

const classes = [
  {
    id: 1,
    name: 'test class',
    description: 'description here',
    start: '5PM',
    end: '6PM',
    trainer_id: 2
  },
  {
    id: 2,
    name: 'test class2',
    description: 'description 2 here',
    start: '5PM',
    end: '6PM',
    trainer_id: null
  },
];

const schedules = [
  {
    id: 1,
    name: 'test class',
    description: 'description here',
    start: '5PM',
    end: '6PM',
    trainer_id: 2
  },
  {
    id: 2,
    name: 'test class2',
    description: 'description 2 here',
    start: '5PM',
    end: '6PM',
    trainer_id: 3
  },
]

/* -*_*_*_*_*_API_*_*_*_*_*_*- */ //passes

describe('apiRouter and server', () => {
  test('server success', () => {
    return supertest(server)
    .get('/')
    .then((res) => {
      expect(res.status).toBe(200)
    })
  });
  test('api is up', () => {
    return supertest(server)
    .get('/api/')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.type).toMatch(/json/i)
    })
  });
})

/* -*_*_*_*_* SCHEDULES *_*_*_*_*_*- */ //passes
describe('schedules', () => {
  test('anyone can see scheduled classes', () => {
    return supertest(server)
    .get('/schedules')
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
  test('get schedule by schedule id', () => {
    return supertest(server)
    .get('/api/schedules/')
    .send(schedules[2])
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.type).toMatch(/json/i)
    })
  })
})



/* -*_*_*_*_* AUTH *_*_*_*_*_*- */
describe('not authorized', () => {
  test('not auth users',() => {
    return supertest(server)
    .get('/api/users')
    .then( res => {
      expect(res.status).toBe(401)
      expect(res.type).toMatch(/json/i)
      expect({message: "Your credentials are not valid."})
    })
  })
  test('not auth trainers', () => {
    return supertest(server)
    .get('/api/trainers')
    .then( res => {
      expect(res.status).toBe(401)
      expect({message: "Your credentials are not valid."})
    })
  })
})

/* -*_*_*_*_* USERS / TRAINERS LOGIN (SAME) *_*_*_*_*_*- */
describe('register user/trainer', () => {
  test.todo('make new user/trainer')
  test.todo('login user/trainer success')
  test.todo('not unique username/email fail message')
  test.todo('update profile user/trainer')
  test.todo('users can see schedule by id')
})

/* -*_*_*_*_* TRAINERS / CLASSES *_*_*_*_*_*- */
describe('trainer and classes', () => {
  test.todo('add a new class')
  test.todo('update a class')
  test.todo('delete a class')
})



