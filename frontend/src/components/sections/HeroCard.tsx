import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { FileUploadArea } from '../upload/FileUploadArea';
import { DetectionPreview } from '../upload/DetectionPreview';
import { AnalyzeButton } from '../upload/AnalyzeButton';
import type { Detection } from '../../services/api';

interface HeroCardProps {
  previewUrl: string | null;
  dragActive: boolean;
  isAnalyzing: boolean;
  detections: Detection[];
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAnalyze: () => void;
}

export const HeroCard = ({ 
  previewUrl, 
  dragActive, 
  isAnalyzing,
  detections,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
  onRemoveImage,
  onAnalyze
}: HeroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative"
    >
      <Card className="rounded-3xl shadow-2xl p-8">
        <FileUploadArea
          previewUrl={previewUrl}
          dragActive={dragActive}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onFileInput={onFileInput}
          onRemoveImage={onRemoveImage}
        />

        <DetectionPreview 
          previewUrl={previewUrl} 
          detections={detections} 
        />

        <AnalyzeButton
          previewUrl={previewUrl}
          isAnalyzing={isAnalyzing}
          onAnalyze={onAnalyze}
        />
      </Card>

      <FloatingElements />
    </motion.div>
  );
};

const FloatingElements = () => {
  return (
    <>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
      >
        <Shield className="w-6 h-6 text-green-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
      >
        <Zap className="w-6 h-6 text-amber-500" />
      </motion.div>
    </>
  );
};