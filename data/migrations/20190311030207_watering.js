exports.up = function(knex, Promise) {
  return knex.schema.createTable("watering", table => {
    table.increments();
    table
      .integer("plantId")
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
    table.datetime("wateringTime");
    table.boolean("smsDelivered").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("watering");
};
