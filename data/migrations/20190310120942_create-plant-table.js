exports.up = function (knex, Promise) {
  return knex.schema.createTable('plant', table => {
    table.uuid('id').primary()
    table.string('name').unique().notNull()
    table.string('location')
    table.string('description')
    table
      .uuid('userId')
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('plant')
}
