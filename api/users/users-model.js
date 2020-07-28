const db = require("../../data/db-config.js");

module.exports = {
 find,
 findBy,
 findById,
 findClasses,
 insert,
 update,
 remove
};

function find() {
  return db('users').select('id', 'username').orderBy('id');
};

function findBy(filter) {
  return db('users').where(filter).orderBy('id')
};

function findById() {
  return db('users').where({ id }).first();
};

function findClasses(userId) {
  return db('classes')
  //join user table with classes
  //get the user id from users table and same user id from classes table
  .join('users', 'users.id', 'classes.user_id')
  //give me the class ID and the class Name under the title Upcoming Class
  .select('classes.id', 'classes.name as Upcoming_Class')
  //the class user ID should match the user ID
  .where('classes.user_id', userId)
};

function insert(user) {
  return db('users')
  .insert(user)
  .then(ids => {
    return findById(ids[0]);
  })
};

function update(id, changes) {
  return db('users').where({ id }).update(changes);
};

function remove(id) {
  return db('users').where('id', id).del();
};