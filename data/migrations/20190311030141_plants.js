exports.up = function(knex, Promise) {
  return knex.schema.createTable("plants", table => {
    table.increments();
    table.string("commonName", 255).notNullable();
    table.string("species", 255).notNullable();
    table.string("imgURL");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("plants");
};
