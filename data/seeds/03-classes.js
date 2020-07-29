exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // only 1 trainer per class
      //trainer can have multiple classes
      //classes can have multiple users
      //one to many
      return knex('classes').insert([
        {name: 'class 1', description: 'description 1', start: '4:00AM', end: '5:00AM', trainer_id: 1},
        {name: 'class 2', description: 'description 2', start: '5PM', end: '630PM', trainer_id: 2},
        {name: 'class 3', description: 'description 3', start: '2300', end: '2400', trainer_id: 3},
      ]);
    });
};
