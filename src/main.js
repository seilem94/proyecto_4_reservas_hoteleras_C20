import 'dotenv/config';
import express from 'express';
import reservasRouter from './routes/reservas.routes.js';
import { notFound, errorHandler } from './utils/error-handler.js';


const port = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`


const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json(
    { 
        ok: true, 
        name: 'API Reservas Hoteleras' ,
        version: '1.0.0'
    }
));

app.use('./api/reservas', reservasRouter);

// 404 y errores
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor corriendo en: ${serverUrl}`));l