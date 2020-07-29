const db = require("../../data/db-config.js");

module.exports = {
 find,
 findBy,
 findById,
 findClasses,
 getClassesById,
 addClass,
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

async function insert(user) {
  try {
    const [id] = await db('users').insert(user, 'id');
 
    return findById(id);
  } catch (error) {
    throw error;
  }
 };
 
function findById(id) {
  return db('users').where({ id }).first();
};

function findClasses(userId) {
  return db('classes')
  //join user table with classes
  //get the user id from users table and same user id from classes table
  .join('users', 'users.id', 'classes.user_id')
  //give me the class ID and the class Name 
  .select('classes.id', 'classes.name')
  //the class user ID should match the user ID
  .where('classes.user_id', userId)
};

function update(id, changes) {
  return db('users').where({ id }).update(changes);
};

function remove(id) {
  return db('users').where('id', id).del();
};

function getClassesById(id) {
  return db('classes').select("id", "name").where({userId: id});
}

//user add class

function addClass(id) {
  return db('users').where({ id }).insert('')
}