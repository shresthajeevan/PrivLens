import React, { useCallback, useRef, useState } from 'react'

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
    <div className="w-full max-w-3xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label="File upload dropzone"
        className="rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col md:flex-row gap-6 items-center"
      >
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
          ) : (
            <div className="text-center text-slate-500">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                <path d="M12 3v12" stroke="#0b63ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8l3-3 3 3" stroke="#0b63ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#93c5fd" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-lg font-medium">Drag & drop an image, or click to choose</div>
              <div className="text-sm text-slate-400 mt-1">JPEG, PNG, WEBP — up to 10MB</div>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {file && (
            <div className="text-sm text-slate-600">Selected file: <span className="font-medium">{file.name}</span></div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={clear}
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50"
            >
              Clear
            </button>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand to-brand/80 text-white shadow hover:opacity-95 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload & Analyze'}
            </button>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          name="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  )
}

export default FileUpload