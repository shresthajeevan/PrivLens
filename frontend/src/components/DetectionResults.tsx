import { motion } from 'framer-motion';
import { Shield, Eye, FileText, Car, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from './ui/Card';

interface Detection {
  type: 'face' | 'text' | 'license_plate' | 'document';
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface DetectionResultsProps {
  detections: Detection[];
  imageUrl: string;
  onToggleBlur: (index: number) => void;
  blurredItems: number[];
}

export const DetectionResults = ({ 
  detections, 
  imageUrl, 
  onToggleBlur, 
  blurredItems 
}: DetectionResultsProps) => {
  const getDetectionIcon = (type: string) => {
    switch (type) {
      case 'face': return <Eye className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'license_plate': return <Car className="w-4 h-4" />;
      case 'document': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getDetectionColor = (type: string) => {
    switch (type) {
      case 'face': return 'bg-blue-500';
      case 'text': return 'bg-green-500';
      case 'license_plate': return 'bg-amber-500';
      case 'document': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDetectionLabel = (type: string) => {
    switch (type) {
      case 'face': return 'Faces';
      case 'text': return 'Text';
      case 'license_plate': return 'License Plates';
      case 'document': return 'Documents';
      default: return 'Unknown';
    }
  };

  const detectionCounts = detections.reduce((acc, detection) => {
    acc[detection.type] = (acc[detection.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Image with Detection Overlays */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Detection Preview
        </h3>
        <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={imageUrl}
            alt="Analysis result"
            className="w-full h-auto"
          />
          {detections.map((detection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`absolute border-2 ${getDetectionColor(detection.type)} ${
                blurredItems.includes(index) ? 'opacity-30' : 'opacity-100'
              }`}
              style={{
                left: `${detection.boundingBox.x * 100}%`,
                top: `${detection.boundingBox.y * 100}%`,
                width: `${detection.boundingBox.width * 100}%`,
                height: `${detection.boundingBox.height * 100}%`,
              }}
            />
          ))}
        </div>
      </Card>

      {/* Detection Summary */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Detection Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(detectionCounts).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className={`w-3 h-3 ${getDetectionColor(type)} rounded-full`}></div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {getDetectionLabel(type)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{count}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Detection Controls */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Privacy Controls
          </h3>
          <div className="space-y-3">
            {detections.map((detection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getDetectionColor(detection.type)} text-white`}>
                    {getDetectionIcon(detection.type)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {getDetectionLabel(detection.type)} {index + 1}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Confidence: {Math.round(detection.confidence * 100)}%
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onToggleBlur(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    blurredItems.includes(index)
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                  }`}
                >
                  {blurredItems.includes(index) ? (
                    <>
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Protected
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 inline mr-1" />
                      Protect
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};