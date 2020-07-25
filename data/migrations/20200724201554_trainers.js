exports.up = function (knex) {
  return knex.schema
    .createTable("trainers", tbl => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.string('email', 128).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("trainers");
};