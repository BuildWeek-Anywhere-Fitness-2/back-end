
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trainers').del()
    .then(function () {
      // Inserts seed entries
      return knex('trainers').insert([
        {name: 'trainer1', password: 'abcd', email: "trainer1@test.com"},
        {name: 'trainer2', password: 'abcd', email: "trainer2@test.com", bio: "a trainer bio here"},
      ]);
    });
};
