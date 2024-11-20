import express from 'express';
import { AppDataSource } from './core/config/ormconfig';
import OrderRoutes from './presentation/routes/OrderRoutes';

const PORT = process.env.API_PORT ?? 5000
const HOST = process.env.API_HOST ?? "localhost"
const app = express();
app.use(express.json());

app.use(OrderRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log('Server running on http://', HOST + ":" + PORT);
    });
  })