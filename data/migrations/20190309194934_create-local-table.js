exports.up = function (knex, Promise) {
  return knex.schema.createTable('local', table => {
    table.uuid('id').primary()
    table.string('email').unique().notNull()
    table.string('password').notNull()
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('local')
}
