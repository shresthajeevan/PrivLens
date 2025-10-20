import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';
import { Button } from '../ui/Button';

interface AnalyzeButtonProps {
  previewUrl: string | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export const AnalyzeButton = ({ previewUrl, isAnalyzing, onAnalyze }: AnalyzeButtonProps) => {
  if (!previewUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-4"
    >
      <Button
        className="w-full"
        icon={Scan}
        disabled={isAnalyzing}
        onClick={onAnalyze}
      >
        {isAnalyzing ? 'Analyzing...' : 'Scan for Privacy Risks'}
      </Button>
    </motion.div>
  );
};