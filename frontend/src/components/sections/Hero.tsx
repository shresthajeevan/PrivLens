import { motion } from 'framer-motion';
import { Upload, Sparkles, CheckCircle, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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
                iconPosition="right"
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

            {/* Trust Badges */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                  ))}
                </div>
                <span>Trusted by 10K+ users</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Card */}
          <HeroCard />
        </div>
      </div>
    </section>
  );
};

const HeroCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative"
    >
      <Card className="rounded-3xl shadow-2xl p-8">
        {/* Demo Image Container */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 mb-6">
          <div className="aspect-video bg-slate-300 dark:bg-slate-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Drop image to analyze</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Supports JPG, PNG, WebP</p>
            </div>
          </div>
        </div>

        {/* Detection Results Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Detection Results</span>
            <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Ready to analyze</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Faces', count: 0, color: 'bg-blue-500' },
              { label: 'Text', count: 0, color: 'bg-green-500' },
              { label: 'Plates', count: 0, color: 'bg-amber-500' },
              { label: 'Documents', count: 0, color: 'bg-purple-500' }
            ].map((item) => (
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
      </Card>

      {/* Floating Elements */}
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
    </motion.div>
  );
};