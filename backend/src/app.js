import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import medicineRoutes from './routes/medicineRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

app.use('/api/medicines', medicineRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
