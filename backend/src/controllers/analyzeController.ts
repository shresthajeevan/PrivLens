import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { analyzeWithAI } from '../services/aiService.js';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const analyzeFile = [
  upload.single('file'),
  async (req: MulterRequest, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await analyzeWithAI(file.path);
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze file' });
    }
  },
];
