
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments().primary(); //ID auto primary key
    tbl.text('username', 128).notNullable().unique(); //required username
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required email
    tbl.text('bio', 255)
  })
  .createTable('trainers', tbl => {
    tbl.increments().primary(); //ID auto primary key
    tbl.text('name', 128).notNullable().unique(); //required name
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required email
    tbl.text('bio', 255)
  })
  .createTable('classes', tbl => {
    tbl.increments().primary(); //ID auto primary key
    tbl.text('name', 128).notNullable().unique();
    tbl.text('description', 255).notNullable();
    tbl.text('start', 7).notNullable();
    tbl.text('end', 7).notNullable();
    tbl.integer('trainer_id')// trainer id auto incremented
      .notNullable() //trainer_id needs to be added
      .unsigned()
      .references('id')
      .inTable('trainers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
  .createTable('schedules', tbl => {
    tbl.increments().primary();
    tbl.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.integer('trainer_id').unsigned().references('id').inTable('trainers').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
  })
  
};

//User adds class to schedule inserting (db schedule)
//db classes for the user to access classes ( db classes) give cl

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('schedules') // 4th created
  .dropTableIfExists('classes') // 3rd created
  .dropTableIfExists('trainers')// 2nd created
  .dropTableIfExists('users') // 1st created
};
