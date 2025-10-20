import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Stats } from './components/sections/Stats';
import { CTA } from './components/sections/CTA';
import { analyzeImage } from './services/api'; // Import the API service

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar isDark={isDark} onToggleDarkMode={toggleDarkMode} />
      <Hero analyzeImage={analyzeImage} /> {/* Pass the API function */}
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;