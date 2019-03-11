exports.up = function (knex, Promise) {
  return knex.schema.createTable('watering', table => {
    table.uuid('id').primary()
    table.datetime('wateringTime')
    table.boolean('textSent').defaultTo(false)
    table
      .uuid('plantId')
      .references('id')
      .inTable('plant')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('watering')
}
