exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.date('birthdate');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones', (table) => {
      table.dropColumn('id');
      table.dropColumn('first_name');
      table.dropColumn('last_name');
      table.dropColumn('birthdate');
    })
  ])
};