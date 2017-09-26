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




let argument = process.argv[2].toString();

knex.select('first_name', 'last_name', 'birthdate').from('famous_people').where({first_name: argument}).orWhere({last_name: argument}).asCallback(function(err, result) {
  if (err) {
    console.log("error in query:", err)
  } else {
    console.log("Searching...")
    input(result)
  }
}).finally(function() {
  knex.destroy();
})


function input(resultObject) {
  let numberOfMatches = Object.keys(resultObject).length;
  let queryResult = resultObject;
  output(queryResult, numberOfMatches);
}


function output(queryResultArray, numOfMatches) {
  console.log(`Found ${numOfMatches} person(s) by the name '${argument}'`)
  for (var match in queryResultArray) {
    let matchedPerson = queryResultArray[match];
    console.log(`${match}: ${matchedPerson.first_name} ${matchedPerson.last_name}, born ${matchedPerson.birthdate}`)
  }
}