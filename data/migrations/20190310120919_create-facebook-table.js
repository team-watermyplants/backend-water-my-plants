exports.up = function (knex, Promise) {
  return knex.schema.createTable('facebook', table => {
    table.string('id').primary().unique().notNull()
    table.string('givenName')
    table.string('familyName ')
    table.string('displayName')
    table.string('email').unique()
    table.string('photo')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('facebook')
}
