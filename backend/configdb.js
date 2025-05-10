import mysql from 'mysql2/promise';

export  const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'funcionarios_iud',
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

try {
  await db.connect();
  console.log('Conexión exitosa a la base de datos');
} catch (err) {
  console.error('error de conexión', err.message);
}

