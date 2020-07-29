const db = require("../../data/db-config.js");

module.exports = {
 find,
 findBy,
 findById,
 findClasses,
 getScheduleById,
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

//get the users id
//join the schedules and user id in schedules ahould match user id 
function getScheduleById(id) {
  return db('users')
  .join('schedules', 'schedules.user_id', 'users.id')
  .join('classes',  'schedules.class_id', 'classes.id')
  .join('trainers', 'schedules.trainer_id', 'trainers.id')
  .select('schedules.id','classes.name as Class', 'classes.start as Start', 'classes.end as End','trainers.name as Trainer')
  .where({ 'users.id': id });
}

//user add class

function addClass(id) {
  return db('users').where({ id }).insert('')
}