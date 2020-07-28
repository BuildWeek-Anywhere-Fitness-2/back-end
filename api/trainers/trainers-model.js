const db = require('../../data/db-config.js')

module.exports = {
  find,
  findBy,
  findById,
  findClasses,
  insert,
  update,
  remove
};

//find trainers
function find() {
  return db('trainers').select('id', 'name').orderBy('id');
};

function findBy(filter) {
  return db('trainers').where(filter).orderBy('id')
};

//find trainers by id
function findById(id) {
  return db('trainers').where({ id }).first();
};

//find classes that the trainer is doing
function findClasses(trainerId) {
  return db('classes')
  .join('trainers','trainers.id','classes.trainer_id')
  .select('classes.id', 'classes.name')
  .where('classes.trainers_id', trainerId)
};

//add trainer
function insert(trainer) {
  return db('trainers')
  .insert(trainer)
  .then(ids => {
    return findById(ids[0]);
  })
};

//update trainer
function update(id, changes) {
  return db('trainers').where({ id }).update(changes);
};

//delete trainer account
function remove (id) {
  return db('trainers').where('id', id).del();
};

//trainer can add a class

//trainer deletes a class