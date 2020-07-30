//import what I need

const auth = require('../auth/auth-router.js')
const request = require('supertest')
const server = require('../../server.js');



//Dummy lists

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
    return request(server)
    .get('/')
    .then((res) => {
      expect(res.status).toBe(200)
    })
  });
  test('api is up', () => {
    return request(server)
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
    return request(server)
    .get('/schedules')
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
  test('get schedule by schedule id', () => {
    return request(server)
    .get('/api/schedules/')
    .send(schedules[2])
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.type).toMatch(/json/i)
    })
  })
})

/* -*_*_*_*_* AUTH *_*_*_*_*_*- */ //passes
describe('not authorized', () => {
  test('not auth users',() => {
    return request(server)
    .get('/api/users')
    .then( res => {
      expect(res.status).toBe(401)
      expect(res.type).toMatch(/json/i)
      expect({message: "Your credentials are not valid."})
    })
  })
  test('not auth trainers', () => {
    return request(server)
    .get('/api/trainers')
    .then( res => {
      expect(res.status).toBe(401)
      expect({message: "Your credentials are not valid."})
    })
  })
})

/* -*_*_*_*_* USERS / TRAINERS LOGIN (SAME) *_*_*_*_*_*- */
describe('register user/trainer', () => { 
  test.skip('new user', () => { //will fail if run twice because needs to be unique
    return request(server)
    .post('/api/auth/registeruser')
    .send({ username: 'testusertest', password: 'abcde', email: 'email@email.com' })
    .then(res => {
      expect(res.status).toBe(201);
    });

  })
  test.skip('new trainer', () => {
    return request(server)
    .post('/api/auth/registertrainer')
    .send({ name: 'testtrainertest', password: 'asdf', email: 'trainer@email.com' })
    .then(res => {
      expect(res.status).toBe(201);
    })
  })

})

describe('Login user/trainer', () => {
  test.todo('add a new class')
  test.todo('update a class')
  test.todo('delete a class')
})

describe('Update user/trainer', () => {
  test.todo('update profile user/trainer')
  test.todo('users can see schedule by id')
})

/* -*_*_*_*_* TRAINERS / CLASSES *_*_*_*_*_*- */
describe('trainer and classes', () => {
  test.todo('add a new class')
  test.todo('update a class')
  test.todo('delete a class')
})



