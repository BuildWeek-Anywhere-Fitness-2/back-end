
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('username', 128).notNullable().unique(); //required unique username
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required unique email
    tbl.text('bio', 255)
  })

  .createTable('trainers', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('name', 128).notNullable().unique(); //required unique name
    tbl.text('password', 255).notNullable(); //required password
    tbl.text('email', 255).notNullable().unique(); //required unique email
    tbl.text('bio', 255)
  })

  .createTable('classes', tbl => {
    tbl.increments(); //ID auto primary key
    tbl.text('name', 128).notNullable();
    tbl.text('description', 255).notNullable();
    tbl.text('start', 7).notNullable();
    tbl.text('end', 7).notNullable();
    tbl.integer('user_id')//user ID auto incremented
      .unsigned()//never negative
      .references('id')//id primary key column
      .inTable('users') //users table
    tbl.integer('trainer_id')// trainer id auto incremented
      .unsigned()
      .references('id')
      .inTable('trainers')
  })
  
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('classes') // last table created
  .dropTableIfExists('trainers')// 2nd table created
  .dropTableIfExists('users') // 1st table created
};
