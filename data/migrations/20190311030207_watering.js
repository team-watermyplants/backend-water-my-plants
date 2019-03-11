exports.up = function(knex, Promise) {
  return knex.schema.createTable("watering", table => {
    table.increments();
    table.datetime("wateringTime");
    table.boolean("smsDelivered").defaultTo(false);
    table.integer("plantId")
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("watering");
};
