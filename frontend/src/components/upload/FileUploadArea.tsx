import { Upload } from 'lucide-react';

interface FileUploadAreaProps {
  previewUrl: string | null;
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const FileUploadArea = ({
  previewUrl,
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
  onRemoveImage
}: FileUploadAreaProps) => {
  return (
    <>
      {/* Hidden File Input */}
      <input
        id="hero-file-upload"
        type="file"
        accept="image/*"
        onChange={onFileInput}
        className="hidden"
      />

      {/* Interactive Demo Image Container */}
      <div 
        className={`bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 mb-6 transition-all duration-200 ${
          dragActive ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-2 border-transparent'
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <label 
          htmlFor="hero-file-upload"
          className="block cursor-pointer"
        >
          <div className="aspect-video bg-slate-300 dark:bg-slate-600 rounded-xl flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemoveImage();
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                >
                  <Upload className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {dragActive ? 'Drop image to analyze' : 'Click or drop image to analyze'}
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Supports JPG, PNG, WebP</p>
              </div>
            )}
          </div>
        </label>
      </div>
    </>
  );
};