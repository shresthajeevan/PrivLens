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

// POST /api/analyze
// multer handles the multipart parsing; we log and return the analysis result directly
export const analyzeFile = [
  upload.single('file'),
  async (req: MulterRequest, res: Response) => {
    try {
      console.log('Received analyze request from', req.ip || req.hostname)
      const file = req.file;
      if (!file) {
        console.error('No file present on request')
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log(`Saved upload to ${file.path} (original: ${file.originalname})`)

      const result = await analyzeWithAI(file.path);
      // return the structured result expected by the frontend
      return res.json(result);
    } catch (error: any) {
      console.error('Error analyzing file:', error?.message || error)
      // If multer produced a forbidden-like error, surface it
      if (error && error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Unexpected file field' });
      }
      return res.status(500).json({ error: 'Failed to analyze file' });
    }
  },
];
