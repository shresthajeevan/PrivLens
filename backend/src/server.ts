import express, { Application } from 'express';
import cors from 'cors';
import analyzeRoutes from './routes/analyzeRoutes.js';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
