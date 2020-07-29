
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trainers').del()
    .then(function () {
      // trainer can be in multiple classes
      //one to many
      return knex('trainers').insert([
        {name: 'trainer1', password: 'abc1', email: 'email1@email.com'},
        {name: 'trainer2', password: 'abc2', email: 'email2@email.com'},
        {name: 'trainer3', password: 'abc3', email: 'email3@email.com'},
      ]);
    });
};
