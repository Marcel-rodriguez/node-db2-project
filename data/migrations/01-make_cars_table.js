exports.up = function (knex) {
  return knex.schema
  .createTable('cars', table => {
    table.increments('id')
    table.string('vin', 17).unique({indexName: 'unique_vin', defferable: 'immediate'}).notNullable()
    table.string('make', 256).notNullable()
    table.string('model', 256).notNullable()
    table.float('mileage').notNullable()
    table.string('title', 256)
    table.string('transmission',256)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
