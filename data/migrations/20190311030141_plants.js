exports.up = function(knex, Promise) {
  return knex.schema.createTable("plants", table => {
    table.increments();
    table.string("name", 255).notNullable();
    table.string("location", 255);
    table.text("description");
    table.string("plantURL");
    table.integer("userId").references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("plants");
};
