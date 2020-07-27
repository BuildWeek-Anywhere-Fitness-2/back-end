const db = require('../../data/db-config.js')

module.exports = {
  find,
  findById,
  findClasses,
  insert,
  update,
  remove
};

//find trainers
function find() {
  return db('trainers');
};

//find trainers by id
function findById() {
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