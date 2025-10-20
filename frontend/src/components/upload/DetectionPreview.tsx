import { CheckCircle } from 'lucide-react';

interface DetectionPreviewProps {
  previewUrl: string | null;
}

export const DetectionPreview = ({ previewUrl }: DetectionPreviewProps) => {
  const detectionItems = [
    { label: 'Faces', count: 0, color: 'bg-blue-500' },
    { label: 'Text', count: 0, color: 'bg-green-500' },
    { label: 'Plates', count: 0, color: 'bg-amber-500' },
    { label: 'Documents', count: 0, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-slate-600 dark:text-slate-300 font-medium">Detection Results</span>
        <div className={`flex items-center space-x-2 text-sm ${
          previewUrl ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'
        }`}>
          <CheckCircle className="w-4 h-4" />
          <span>{previewUrl ? 'Ready to analyze' : 'Upload an image'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {detectionItems.map((item) => (
          <div key={item.label} className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};