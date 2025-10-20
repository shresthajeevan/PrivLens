import { useState } from 'react'
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css'

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

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <div>
      <h1>PrivLens</h1>
      <FileUpload onResult={setResult} />
      <ResultsDisplay result={result} />
    </div>
  );
}

export default App
