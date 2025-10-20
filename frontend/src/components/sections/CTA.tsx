import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl shadow-blue-500/20"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Secure Your Images?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users protecting their privacy with AI-powered detection and masking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#hero" className="inline-block">
              <Button 
                variant="secondary" 
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-white text-blue-600"
              >
                Click here to Get Started
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};