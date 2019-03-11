exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.uuid('id').primary()
    table.string('displayName').notNull()
    table.string('email').unique().notNull()
    table.string('phone')
    table.string('photo')
    table.string('timeZone')
    table
      .uuid('localId')
      .references('id')
      .inTable('local')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
    table
      .string('githubId')
      .references('id')
      .inTable('github')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
    table
      .string('facebookId')
      .references('id')
      .inTable('facebook')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
    table
      .string('googleId')
      .references('id')
      .inTable('google')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user')
}
