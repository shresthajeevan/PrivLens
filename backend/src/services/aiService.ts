import vision from '@google-cloud/vision';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AI service — returns structured detections and explanation
export type Detection = {
  id: string;
  label: 'face' | 'text' | 'plate' | 'document';
  score: number;
  bbox: { x: number; y: number; w: number; h: number }; // relative (0..1)
  text?: string;
}

export type AnalysisResult = {
  filePath: string;
  detections: Detection[];
  explanation: string;
}

export const analyzeWithAI = async (filePath: string): Promise<AnalysisResult> => {
  try {
    console.log('🔍 Starting AI analysis for:', filePath);
    
    // Method 1: Try using API key from environment variable
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    
    let client;
    if (apiKey) {
      console.log('🔑 Using API key from environment');
      client = new vision.ImageAnnotatorClient({
        apiKey: apiKey
      });
    } else {
      // Method 2: Try service account credentials
      const possiblePaths = [
        path.join(process.cwd(), 'privlens-vision-key.json'),
        path.join(process.cwd(), 'privlens-key.json'),
        path.join(__dirname, '../../privlens-vision-key.json'),
        path.join(__dirname, '../../privlens-key.json'),
      ];

      let credentialPath = '';
      for (const possiblePath of possiblePaths) {
        const fullPath = path.resolve(possiblePath);
        if (fs.existsSync(fullPath)) {
          credentialPath = fullPath;
          console.log('✅ Found credentials at:', credentialPath);
          break;
        }
      }

      if (!credentialPath) {
        throw new Error(`
No Google Cloud credentials found. Please either:

OPTION 1 - Use API Key:
1. Set GOOGLE_VISION_API_KEY environment variable
2. Get API key from: https://console.cloud.google.com/apis/credentials

OPTION 2 - Use Service Account:
1. Create service account and download JSON key
2. Place privlens-key.json in backend root directory
        `);
      }

      client = new vision.ImageAnnotatorClient({
        keyFilename: credentialPath
      });
    }
    
    console.log('🤖 Calling Google Vision API...');
    
    // Read the image file
    const imageBuffer = fs.readFileSync(filePath);
    
    const [result] = await client.annotateImage({
      image: { content: imageBuffer },
      features: [
        { type: 'FACE_DETECTION' },
        { type: 'TEXT_DETECTION' },
        { type: 'OBJECT_LOCALIZATION' },
        { type: 'LABEL_DETECTION' },
      ],
    });

    console.log('✅ Google Vision API response received');

    const detections: Detection[] = [];

    // Faces
    if (result.faceAnnotations) {
      console.log(`👥 Found ${result.faceAnnotations.length} faces`);
      result.faceAnnotations.forEach((face: any, idx: number) => {
        const vertices = face.boundingPoly?.vertices;
        if (vertices && vertices.length === 4) {
          const x = vertices[0].x || 0;
          const y = vertices[0].y || 0;
          const w = (vertices[2].x || 0) - x;
          const h = (vertices[2].y || 0) - y;
          
          detections.push({
            id: `face-${idx}`,
            label: 'face',
            score: face.detectionConfidence || 0.9,
            bbox: { x, y, w, h },
          });
        }
      });
    }

    // Text (OCR)
    if (result.textAnnotations && result.textAnnotations.length > 0) {
      console.log(`📝 Found ${result.textAnnotations.length - 1} text regions`);
      result.textAnnotations.forEach((textAnn: any, idx: number) => {
        if (idx === 0) return; // skip the first, which is the full text
        const vertices = textAnn.boundingPoly?.vertices;
        if (vertices && vertices.length === 4) {
          const x = vertices[0].x || 0;
          const y = vertices[0].y || 0;
          const w = (vertices[2].x || 0) - x;
          const h = (vertices[2].y || 0) - y;
          
          let label: Detection['label'] = 'text';
          const text = textAnn.description || '';
          
          if (/\b[A-Z0-9]{2,}-?[A-Z0-9]{2,}\b/.test(text) || /[A-Z]{1,3}\s?\d{1,4}\s?[A-Z]{1,3}/.test(text)) {
            label = 'plate';
          }
          if (/ID|Passport|License|Card|Driving|Vehicle|Registration|SSN|Social|Security/i.test(text)) {
            label = 'document';
          }
          
          detections.push({
            id: `text-${idx}`,
            label,
            score: 0.8,
            bbox: { x, y, w, h },
            text: text,
          });
        }
      });
    }

    const explanation = `AI Analysis Complete: Detected ${detections.length} privacy-sensitive items including ${detections.filter(d => d.label === 'face').length} faces, ${detections.filter(d => d.label === 'text').length} text regions, ${detections.filter(d => d.label === 'plate').length} license plates, and ${detections.filter(d => d.label === 'document').length} documents.`;

    console.log('🎯 Real AI analysis completed successfully');
    return {
      filePath,
      detections,
      explanation,
    };
  } catch (error: any) {
    console.error('❌ Google Vision API failed:', error.message);
    
    if (error.message.includes('API has not been used') || error.message.includes('disabled')) {
      throw new Error(`Google Cloud Vision API is not enabled. Please enable it here: https://console.cloud.google.com/apis/api/vision.googleapis.com/overview?project=547720215359`);
    } else if (error.message.includes('PERMISSION_DENIED')) {
      throw new Error(`Permission denied. Please ensure:\n1. Vision API is enabled\n2. You have valid API key or service account credentials\n3. Billing is enabled for your project`);
    } else {
      throw new Error(`Google Cloud Vision API failed: ${error.message}`);
    }
  }
};