exports.up = function (knex, Promise) {
  return knex.schema.createTable('google', table => {
    table.string('id').primary().unique().notNullable()
    table.string('givenName')
    table.string('familyName ')
    table.string('displayName')
    table.string('email').unique()
    table.string('photo')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('google')
}
