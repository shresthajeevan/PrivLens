import express from 'express';
import { analyzeFile } from '../controllers/analyzeController.js';

const router = express.Router();

router.post('/', analyzeFile);

export default router;
