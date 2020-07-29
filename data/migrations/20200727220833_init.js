
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('username', 128).notNullable().unique(); //required username
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required email
    tbl.text('bio', 255)
  })
  .createTable('trainers', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('name', 128).notNullable().unique(); //required name
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required email
    tbl.text('bio', 255)
  })
  .createTable('classes', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('name', 128).notNullable().unique();
    tbl.text('description', 255).notNullable();
    tbl.text('start', 7).notNullable();
    tbl.text('end', 7).notNullable();
    tbl.integer('trainer_id')// trainer id auto incremented
      .unsigned()
      .references('id')
      .inTable('trainers')
  })
  .createTable('schedules', tbl => {
    tbl.increments();
    tbl.integer('class_id').unsigned().references('id').inTable('classes')
    tbl.integer('trainer_id').unsigned().references('id').inTable('trainers')
    tbl.integer('user_id').unsigned().references('id').inTable('users')
  })
  
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('schedules') // 4th created
  .dropTableIfExists('classes') // 3rd created
  .dropTableIfExists('trainers')// 2nd created
  .dropTableIfExists('users') // 1st created
};
