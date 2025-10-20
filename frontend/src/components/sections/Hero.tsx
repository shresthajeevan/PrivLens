import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroCard } from './HeroCard';

export const Hero = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      console.log('File selected:', file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const handleGetStarted = () => {
    const fileInput = document.getElementById('hero-file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <section id="hero" className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <HeroContent onGetStarted={handleGetStarted} />
          
          {/* Right Content - Interactive Hero Card */}
          <HeroCard 
            previewUrl={previewUrl}
            dragActive={dragActive}
            isAnalyzing={isAnalyzing}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onFileInput={handleFileInput}
            onRemoveImage={removeImage}
            onAnalyze={handleAnalyze}
          />
        </div>
      </div>
    </section>
  );
};

interface HeroContentProps {
  onGetStarted: () => void;
}

const HeroContent = ({ onGetStarted }: HeroContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center lg:text-left"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700 shadow-lg mb-8"
      >
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI-Powered Privacy Protection
        </span>
      </motion.div>

      <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
          Protect Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Digital Privacy
        </span>
      </h1>

      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
        PrivLens uses advanced AI to automatically detect and mask sensitive information in your images. 
        Protect faces, license plates, documents, and personal data with a single click.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button 
          size="lg" 
          icon={Upload}
          onClick={onGetStarted}
        >
          Upload & Analyze Image
        </Button>

        <Button 
          variant="secondary" 
          size="lg"
        >
          View Live Demo
        </Button>
      </div>

      <TrustBadges />
    </motion.div>
  );
};

const TrustBadges = () => {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          ))}
        </div>
        <span>Trusted by 10K+ users</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>SOC 2 & GDPR Compliant</span>
      </div>
    </div>
  );
};