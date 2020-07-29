const db = require('../../data/db-config.js')

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};

//get class list
function find() {
  return db('classes').select('id', 'name').orderBy('id');
};

//get classes by whatever choose certain parameter to look for
function findBy(filter) {
  return db('classes').where(filter).orderBy('id')
};

//get classes by id
function findById(id) {
  return db('classes').where({ id }).first();
};

//create a new class
function insert(newClass){
  return db('classes')
  .insert(newClass, 
    ['id', 
    'name', 
    'description', 
    'start',
    'end', 
    'trainer_id'])
};

//update classes
function update(id, changes) {
  return db('classes').where({ id }).update(changes);
};

//delete classes
function remove (id) {
  return db('classes').where('id', id).del();
};


