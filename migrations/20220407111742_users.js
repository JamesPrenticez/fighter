exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
  table.increments('id').primary()
  table.string('wallet')
  table.string('username')
  })  
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
};