import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CompanyPage } from './pages/CompanyPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { EstimatingPage } from './pages/EstimatingPage';
import { ContactPage } from './pages/ContactPage';

/* ─── Scroll Progress Bar ──────────────────────────────────────── */
const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      id="scroll-progress-bar"
      style={{ width: `${progress * 100}%`, transition: 'width 0.08s linear' }}
    />
  );
};

/* ─── Scroll to top on route change ───────────────────────────── */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

/* ─── Layout wrapper ──────────────────────────────────────────── */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <ScrollProgressBar />
    <Navbar />
    <main style={{ flex: 1 }}>
      {children}
    </main>
    <Footer />
  </div>
);

/* ─── App with Router ─────────────────────────────────────────── */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Home / Welcome page */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />

        {/* Company & Team */}
        <Route path="/company" element={<Layout><CompanyPage /></Layout>} />

        {/* Capabilities, Products, Printing, Finishing */}
        <Route path="/capabilities" element={<Layout><CapabilitiesPage /></Layout>} />

        {/* Equipment & Machinery */}
        <Route path="/equipment" element={<Layout><EquipmentPage /></Layout>} />

        {/* Estimating Portal */}
        <Route path="/estimating" element={<Layout><EstimatingPage /></Layout>} />

        {/* Contact */}
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

        {/* Legacy hash redirects → new routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
