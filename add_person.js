const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});




let argument = process.argv.slice(2)

knex.insert({first_name: argument[0], last_name: argument[1], birthdate: argument[2]})
    .into('famous_people')
    .finally(function() {
      knex.destroy();
    })