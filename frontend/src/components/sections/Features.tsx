import { motion } from 'framer-motion';
import { Shield, Eye, Zap, BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "AI-Powered Detection",
    description: "Advanced computer vision identifies sensitive information with 99.2% accuracy"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Real-time Analysis",
    description: "Instant privacy risk assessment as you upload images"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Smart Masking",
    description: "One-click blurring of faces, license plates, and personal data"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Risk Analytics",
    description: "Comprehensive privacy risk scoring and recommendations"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Enterprise-Grade Privacy Protection
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Built with cutting-edge AI technology to safeguard your digital presence across multiple dimensions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card hover className="group">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {feature.description}
        </p>
      </Card>
    </motion.div>
  );
};