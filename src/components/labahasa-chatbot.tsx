'use client'

import { useEffect } from 'react';

const LabahasaChatbot = () => {
  useEffect(() => {
    window.LABahasaChatbotConfig = {
      token: 'lHsVyGw6hRttzE5B',
      baseUrl: 'https://core.poc.labahasa.ai',
    };

    const script = document.createElement('script');
    script.src = 'https://core.poc.labahasa.ai/embed.min.js';
    script.id = 'lHsVyGw6hRttzE5B';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default LabahasaChatbot;