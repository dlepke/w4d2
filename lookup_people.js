const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let argument = process.argv[2].toString();

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1 OR last_name = $1", [argument], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    let numberOfMatches = Object.keys(result.rows).length;
    console.log(`Found ${numberOfMatches} person(s) by the name '${argument}'`)
    let queryResult = result.rows;
    for (var match in queryResult) {
      console.log(`${match}: ${queryResult[match].first_name} ${queryResult[match].last_name}, born ${queryResult[match].birthdate}`)
    }
    client.end();
  });
});