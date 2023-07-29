const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'Mysql@localhost3306',        
  user: 'root',     
  password: '', 
  database: 'THISISTHESQL', 
});

module.exports = connection;

//I'm using my local machine's MySQL workbench so I don't know if this is correct or not 