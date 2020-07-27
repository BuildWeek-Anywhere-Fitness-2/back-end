const db = require('../../data/db-config.js')

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

//get class list
function find() {
  return db('classes');
};

//get classes by id
function findById() {
  return db('classes').where({ id }).first();
};

//create a new class
function insert(newClass){
  return db('classes')
  .insert(newClass)
  .then(ids => {
    return findById(ids[0]);
  })
}

//update classes
function update(id, changes) {
  return db('classes').where({ id }).update(changes);
};

//delete classes
function remove (id) {
  return db('classes').where('id', id).del();
};


