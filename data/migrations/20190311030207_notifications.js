exports.up = function(knex, Promise) {
  return knex.schema.createTable("notifications", table => {
    table.increments();
    table.datetime("notificationsTime");
    table.boolean("smsDelivered").defaultTo(false);
    table
      .integer("plantId")
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notifications");
};
