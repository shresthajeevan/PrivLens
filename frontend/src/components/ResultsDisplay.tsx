import React from 'react';

type Detection = {
  id: string
  label: 'face' | 'text' | 'plate' | 'document'
  score: number
  bbox: { x: number; y: number; w: number; h: number }
  text?: string
}

type AnalysisResult = {
  filePath: string
  detections: Detection[]
  explanation: string
}

interface ResultsDisplayProps {
  result: AnalysisResult | null
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div>
        <h2>Analysis Results</h2>
        <p>No analysis yet. Upload an image to see results.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Analysis Results</h2>
      <p>{result.explanation}</p>
      <ul>
        {result.detections.map((d) => (
          <li key={d.id}>
            <strong>{d.label}</strong> — score: {Math.round(d.score * 100)}%
            {d.text ? ` — "${d.text}"` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsDisplay;