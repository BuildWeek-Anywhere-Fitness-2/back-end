
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {name: 'class1', description: 'a description here', start: "10AM", end:"11AM"},
        {name: 'class2', description: 'a description here', start: "10AM", end:"11AM"},
      ]);
    });
};
