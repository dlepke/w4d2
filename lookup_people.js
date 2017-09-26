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
    input(result);
    client.end();
  });
});

function input(resultObject) {
  let numberOfMatches = Object.keys(resultObject.rows).length;
  let queryResult = resultObject.rows;
  output(queryResult, numberOfMatches);
}


function output(queryResultArray, numOfMatches) {
  console.log(`Found ${numOfMatches} person(s) by the name '${argument}'`)
  for (var match in queryResultArray) {
    let matchedPerson = queryResultArray[match];
    console.log(`${match}: ${matchedPerson.first_name} ${matchedPerson.last_name}, born ${matchedPerson.birthdate}`)
  }
}