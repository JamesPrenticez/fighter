exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
  table.increments('id').primary()
  table.string('username')
  table.string('password')
  table.string('email')
  })  
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
};