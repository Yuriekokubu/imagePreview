const mysql = require('mysql');

exports.db = mysql.createPool({
  host: 'localhost',
  user: 'linkpv_root',
  password: '963214785',
  database: 'linkpv_db',
  multipleStatements: true,
});
