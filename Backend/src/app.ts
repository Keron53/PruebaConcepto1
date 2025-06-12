import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import routes from './routes/index.routes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);

export default app;
