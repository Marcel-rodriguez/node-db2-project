
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin:"6615545ZF6845772", make: "Nissan", model: "350z", mileage: "55622", title: "rebuilt", transmission: "manual"},
        {vin:"2315545ZFG444455", make: "Toyota", model: "camry", mileage: "44522", title: "clean", transmission: "automatic"},
        {vin:"2312745ZFG469954", make: "Cheverolet", model: "stingray", mileage: "448855", title: "clean", transmission: "manual"}
      ]);
    });
};
