exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.integer('nonce').notNullable().defaultTo(Math.floor(Math.random() * 1000000))
    table.string('publicAddress').unique()
    table.string('username').unique()
  })  
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
};