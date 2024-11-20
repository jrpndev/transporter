import express from 'express';
import { AppDataSource } from './core/config/ormconfig';
import OrderRoutes from './presentation/routes/OrderRoutes';

const app = express();
app.use(express.json());

app.use(OrderRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((error) => console.error('Error during Data Source initialization:', error));
