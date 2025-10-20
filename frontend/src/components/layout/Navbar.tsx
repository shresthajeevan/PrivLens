import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar = ({ isDark, onToggleDarkMode }: NavbarProps) => {
  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              PrivLens
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Solutions'].map((item) => (
              <button 
                key={item}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
            <Button>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};