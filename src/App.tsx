import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';

function LanguageHandler() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    if (path.startsWith('/zh')) {
      if (i18n.language !== 'zh') {
        i18n.changeLanguage('zh');
      }
    } else {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    }
  }, [location, i18n]);
  
  // Initial redirection logic
  useEffect(() => {
      // Only run on the root path
      if (location.pathname === '/') {
          // Check if we have already handled the redirect in this session
          const hasHandled = sessionStorage.getItem('n1n_lang_redirect');
          
          if (!hasHandled) {
              const browserLang = navigator.language;
              // If browser language starts with 'zh', redirect to /zh
              if (browserLang.toLowerCase().startsWith('zh')) {
                  navigate('/zh', { replace: true });
              }
              // Mark as handled
              sessionStorage.setItem('n1n_lang_redirect', 'true');
          }
      }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
       <LanguageHandler />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/zh" element={<Home />} />
         <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
