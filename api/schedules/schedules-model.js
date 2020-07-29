const db = require('../../data/db-config.js')

module.exports = {
  find,
  findBy,
  findById,
  addClassSchedule,
  update,
  removeScheduledClass
};

//get schedules list to show with name and classes WORKS
function find() {
  return db('schedules')
  .join('classes',  'schedules.class_id', 'classes.id')
  .join('trainers', 'schedules.trainer_id', 'trainers.id')
  .select('classes.name as Class', 'classes.start as Start', 'classes.end as End','trainers.name as Trainer')
};

//get schedules 
function findBy(filter) {
  return db('schedules').where(filter).orderBy('id')
};

//get schedule by id WORKS
function findById(id) {
  return db('schedules')
  .join('classes',  'schedules.class_id', 'classes.id')
  .join('trainers', 'schedules.trainer_id', 'trainers.id')
  .select('schedules.id','classes.name as Class', 'classes.start as Start', 'classes.end as End','trainers.name as Trainer')
  .where({ 'schedules.id': id }).first();
};

//work on these another day when I figure it out
//add a new class to schedule
//get the schedule db
//add a class from classes db
// need to pull trainer id and class id before the form opens adding class (async)
//react -> search for classes --> click on classes you want -->pull data from class --> get class_id and trainer_id (should be done before form opens)--> when form opens to add class, program into req.body to have trainer id and class id, possibly pulled from redux state --> then they can sign up
function addClassSchedule(newClass){
  return db('schedule')
  .insert(newClass, 
    ['id', 'class_id', 'trainer_id', 'user_id'])
};


//update schedule
function update(id, changes) {
  return db('schedules').where({ id }).update(changes);
};

//delete classes from schedule
function removeScheduledClass(id) {
  return findById(id)
  .then( delClass => {
    return db('schedules').where({ id }).delete()
    .then(() => {
      return delClass
    })
  })
};