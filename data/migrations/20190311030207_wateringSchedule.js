exports.up = function(knex, Promise) {
  return knex.schema.createTable("wateringSchedule", table => {
    table
      .integer("Plant ID")
      .references("id")
      .inTable("plants")
      .notNullable();
    table.integer("Watering Interval (in days)").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("wateringSchedule");
};
