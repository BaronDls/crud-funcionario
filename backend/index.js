import express from 'express';
import { db } from './configdb.js'; 
import cors from 'cors';
import funcionarioRouter from './routes/funcionario.routes.js';

const app = express();
const PORT = 3000;   
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/funcionarios', funcionarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});


