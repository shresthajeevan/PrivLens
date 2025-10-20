// Mock AI service — returns structured detections and explanation
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
  // Return a deterministic mock response so frontend can be developed without real AI keys
  // Two mock detections: a face and an OCR'd text area
  const detections: Detection[] = [
    {
      id: 'd1',
      label: 'face',
      score: 0.98,
      bbox: { x: 0.18, y: 0.15, w: 0.2, h: 0.25 },
    },
    {
      id: 'd2',
      label: 'text',
      score: 0.93,
      bbox: { x: 0.55, y: 0.6, w: 0.35, h: 0.18 },
      text: '123 Main St',
    },
  ];

  const explanation = `Detected ${detections.length} items: ${detections
    .map((d) => `${d.label}${d.text ? ` ("${d.text}")` : ''}`)
    .join(', ')}. These may reveal personal information — consider blurring or masking them before sharing.`;

  return {
    filePath,
    detections,
    explanation,
  };
};
