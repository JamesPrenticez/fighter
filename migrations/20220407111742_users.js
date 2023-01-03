exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('password').unique()
    table.string('username').unique()
    table.string('characters').unique()
  })  
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}