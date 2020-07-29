
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // user can be in multiple classes
      //one to many
      return knex('users').insert([
        {username: 'user1', password: 'abc1', email: 'email1@email.com'},
        {username: 'user2', password: 'abc2', email: 'email2@email.com', bio: 'blah'},
        {username: 'user3', password: 'abc3', email: 'email3@email.com'},
      ]);
    });
};
