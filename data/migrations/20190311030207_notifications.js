exports.up = function(knex, Promise) {
  return knex.schema.createTable("notifications", table => {
    table.increments();
    table.datetime("notificationTime");
    table.boolean("smsDelivered").defaultTo(false);
    table
      .integer("plantId")
      .references("id")
      .inTable("plants")
      .onDelete("CASCADE");
    table
      .integer("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notifications");
};
