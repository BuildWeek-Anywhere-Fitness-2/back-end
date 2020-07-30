const auth = require('../auth/auth-router.js')
const request = require('supertest')
const server = require('../../server.js');

//authorization token for other tests
/*  https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html */
let token;

beforeAll( done => {
  request(server)
  .post('/api/auth/trainerlogin')
  .send({ name: 'testtrainertest', password: 'asdf' })
  .then( res => {
    token = res.body.token; //saves auth token
    done();
  })
})
/* -*_*_*_*_*_API_*_*_*_*_*_*- */ //passes

describe('GET apiRouter and server', () => {
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
describe('GET schedules', () => {
  test('anyone can see scheduled classes', () => {
    return request(server)
    .get('/api/schedules')
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
  test('get schedule by schedule id', () => {
    return request(server)
    .get('/api/schedules/')
    .send('/api/schedules/2')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.type).toMatch(/json/i)
    })
  })
})

/* -*_*_*_*_* AUTH *_*_*_*_*_*- */ //passes
describe('GET not authorized', () => {
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
describe('POST register user/trainer', () => { //added skip to avoid fail because aaounts must be unique
  test.skip('new user', () => { 
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
  });
  test('duplicate user name, error 500',() => {
    return request(server)
    .post('/api/auth/registeruser')
    .send({ username: 'testusertest', password: 'abcde', email: 'email2@email.com' })
    .then( res => {
      expect(res.status).toBe(500)
    })
  })
  test('duplicate trainer email, error 500', () => {
    return request(server)
    .post('/api/auth/registertrainer')
    .send({ name: 'testtrainertest2', password: 'asdf', email: 'trainer@email.com' })
    .then(res => 
      expect(res.status).toBe(500))
  });

})

describe('POST Login user/trainer', () => { //passes
  test('user login', ()=> {
    return request(server)
    .post('/api/auth/userlogin')
    .send({ username: 'testusertest', password: 'abcde' })
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
  test('trainer login', () => {
    return request(server)
    .post('/api/auth/trainerlogin')
    .send({ name: 'testtrainertest', password: 'asdf' })
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
})

describe('PUT Update trainer', () => { //passes
  test('update profile trainer', () => {
    return request(server)
    .put('/api/trainers/4')
    .set('Authorization', token)
    .send({ bio: 'update test bio'})
    .then(res => {
      expect(res.status).toBe(200)
    })
  })
})

/* -*_*_*_*_* TRAINERS / CLASSES *_*_*_*_*_*- */
describe('PUT & DEL trainer and classes', () => {//add skip because classname must be unique
  test.skip('trainer can make a new class', () => {
    return request(server)
    .post('/api/classes')
    .set('Authorization', token)
    .send({ name: 'addClassTest3', description: 'a test', start: '5pm', end:'6pm', trainer_id: 2 })
    .then(res => {
      expect(res.status).toBe(201)
    })
  })
  test('PUT trainer can update a class', () => {
    return request(server)
    .put('/api/classes/3')
    .set('Authorization', token)
    .send({ description: 'updated description test' })
    .then( res => {
      expect(res.status).toBe(200)
    })
  })
  test.skip('DEL trainer can delete a class', () => {
    return request(server)
    .delete('/api/classes/27') //might have to add +1
    .set('Authorization', token)
    .then( res => {
      expect(res.status).toBe(204)
    })

  })
})



