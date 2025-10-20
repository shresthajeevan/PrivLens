import React, { useCallback, useRef, useState } from 'react'
import './FileUpload.css'

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

interface FileUploadProps {
  onResult: (result: AnalysisResult) => void
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const FileUpload: React.FC<FileUploadProps> = ({ onResult }) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onSelectFile = useCallback((f: File | null) => {
    setError(null)
    setFile(f)
    if (!f) {
      setPreview(null)
      return
    }
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Unsupported file type. Please upload JPG, PNG or WEBP.')
      setFile(null)
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null
    onSelectFile(f)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || res.statusText)
      }
      const data = await res.json()
      // backend now returns the structured analysis result
      onResult(data)
    } catch (err: any) {
      setError(err?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const clear = () => {
    setFile(null)
    setPreview(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  // cleanup object URL when component unmounts or preview changes
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="file-upload-hero">
      <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="File upload dropzone"
      >
        {preview ? (
          <div style={{ textAlign: 'center' }}>
            <img src={preview} alt="preview" className="preview" />
            {file && <div className="filename">{file.name}</div>}
          </div>
        ) : (
          <div className="drop-hint">
            <p>Drag & drop an image here, or click to browse</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="browse-button"
            >
              Choose file
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          className="file-input-hidden"
          type="file"
          name="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileChange}
        />
      </div>

      <div className="controls">
        <button
          className="upload-button primary"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload & Analyze'}
        </button>
        <button className="upload-button" onClick={clear} disabled={uploading}>
          Clear
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default FileUpload