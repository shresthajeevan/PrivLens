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
      <div className="mt-8 w-full max-w-3xl mx-auto app-card">
        <h3 className="text-xl font-semibold">Analysis Results</h3>
        <p className="mt-2 text-slate-500">No analysis yet. Upload an image to see results.</p>
      </div>
    )
  }

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto app-card">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold">Analysis Results</h3>
        <span className="text-sm text-slate-400">{result.filePath}</span>
      </div>

      <p className="mt-3 text-slate-600">{result.explanation}</p>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {result.detections.map((d) => (
          <li key={d.id} className="p-3 rounded-lg border border-slate-100 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium capitalize">{d.label}</div>
                <div className="text-xs text-slate-500">Score: {Math.round(d.score * 100)}%</div>
              </div>
              {d.text && <div className="text-xs text-slate-600">"{d.text}"</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsDisplay;