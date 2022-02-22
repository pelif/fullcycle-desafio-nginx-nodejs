const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb',
};

app.get('/', (req, res) => { 
  insert(res);
}); 

app.listen(PORT, () => {
  console.log('listen port ' + PORT);
});

async function getName() {
  const RANDOM = Math.floor(Math.random() * 10);
  const response = await axios.get('https://swapi.dev/api/people');
  personName = response.data.results;
  return personName[RANDOM].name;
}

async function insert(res) {
  const name = await getName();
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('${name}')`;    
  connection.query(sql);  
  printPeoples(res, connection);
}

function printPeoples(res, connection) {    
  const sql = `SELECT id, name FROM people`;  
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    };
    
    let names = '';    
    for(let people of results) {      
      names += `<p>${people.name}</p>`;
    }
    
    res.send('<h1>Full Cycle Rocks!</h1>' + names);    
  });   
  connection.end();
}
