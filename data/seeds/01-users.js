
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testuser1', password: 'abcd', email: "testuser1@test.com"},
        {username: 'testuser2', password: 'abcd', email: "testuser2@test.com", bio: "a bio here"},
      ]);
    });
};
