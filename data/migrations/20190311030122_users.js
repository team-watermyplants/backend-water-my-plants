exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table
      .string("username", 255)
      .notNullable()
      .unique();
    table.string("password", 255).notNullable();
    table.string("phoneNumber", 255);
    table.string("profileURL");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
