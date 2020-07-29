
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schedules').del()
    .then(function () {
      // Inserts seed entries
      return knex('schedules').insert([
        {class_id: 1, user_id: 1, trainer_id: 1},
        {class_id: 1, user_id: 2, trainer_id: 1},
        {class_id: 1, user_id: 3, trainer_id: 1},
        {class_id: 2, user_id: 1, trainer_id: 2},
        {class_id: 2, user_id: 2, trainer_id: 2},
        {class_id: 2, user_id: 3, trainer_id: 2},
        {class_id: 3, user_id: 1, trainer_id: 3},
        {class_id: 3, user_id: 2, trainer_id: 3},
        {class_id: 3, user_id: 3, trainer_id: 3},

      ]);
    });
};
