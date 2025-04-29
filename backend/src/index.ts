import express from 'express';
import cors from 'cors';
import sequelize from './sequelize';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
