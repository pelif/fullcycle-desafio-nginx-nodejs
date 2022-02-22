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

createTable();

app.get('/', (req, res) => { 
  insert(res);
}); 

app.listen(PORT, () => {
  console.log('listen port ' + PORT);
});

//CREATE TABLE
async function createTable() {
  const connection = await mysql.createConnection(config); 

  const sql =  `CREATE TABLE people (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL)`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    }; 

    console.log('Table people created with Success!');
  })
} 

//Pega um nome da Api swapi.dev
async function getName() {
  const RANDOM = Math.floor(Math.random() * 10);
  const response = await axios.get('https://swapi.dev/api/people');
  personName = response.data.results;
  return personName[RANDOM].name;
}


//Insere o nome do banco de dados
async function insert(res) {
  const name = await getName();
  const connection = mysql.createConnection(config);  
  const sql = `INSERT INTO people(name) values('${name}')`;    
  connection.query(sql);  
  printPeoples(res, connection);
}

//Mostra os nomes inseridos na tabela
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
