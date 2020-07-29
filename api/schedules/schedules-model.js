const db = require('../../data/db-config.js')

module.exports = {
  find,
  findBy,
  findById,
  addClasses,
  update,
  remove
};

//get schedules list
function find() {
  return db('schedules');
};

//get schedules
function findBy(filter) {
  return db('schedules').where(filter).orderBy('id')
};

//get schedule by id
function findById(id) {
  return db('schedules').where({ id }).first();
};

//add a new class to schedule
//get the schedule db
//add a class from classes db
//
function addClasses(newClass){
  return db('schedule')
  .insert(newClass, 
    ['id', 
    'name', 
    'description', 
    'start',
    'end', 
    'trainer_id',
    'user_id'])
};

//update schedule
function update(id, changes) {
  return db('schedules').where({ id }).update(changes);
};

//delete classes from schedule
function remove (id) {
  return db('schedules').where('id', id).del();
};