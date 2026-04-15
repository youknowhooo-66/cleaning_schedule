import express from 'express';
import cors from 'cors';
import bookingRoutes from './routes/bookingRoutes.js';
import cleanerRoutes from './routes/cleanerRoutes.js';
import { usuarioRouter } from './routes/userRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/booking', bookingRoutes);
app.use('/api/cleaner', cleanerRoutes);
app.use('/api/usuario', usuarioRouter);


app.use('/api', usuarioRouter);

app.get('/', (req, res) => {
  res.send('Cleaning Schedule API is running');
});

export default app;
