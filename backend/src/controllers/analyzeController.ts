import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeWithAI } from '../services/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export const analyzeFile = [
  upload.single('image'), // Change 'file' to 'image' to match frontend
  async (req: MulterRequest, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('Processing file:', file.originalname);
      
      const result = await analyzeWithAI(file.path);
      
      // Transform the response to match frontend expectations
      const transformedDetections = result.detections.map(detection => ({
        type: detection.label === 'plate' ? 'license_plate' : detection.label,
        confidence: detection.score,
        boundingBox: {
          x: detection.bbox.x,
          y: detection.bbox.y, 
          width: detection.bbox.w,
          height: detection.bbox.h
        },
        text: detection.text
      }));

      res.json({
        success: true,
        detections: transformedDetections,
        riskAnalysis: {
          personalData: `Found ${transformedDetections.length} sensitive items`,
          identityRisk: result.explanation,
          locationRisk: 'Potential location data detected'
        },
        explanation: result.explanation
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to analyze file' 
      });
    }
  },
];