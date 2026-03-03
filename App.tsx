import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ApplicationPage from './pages/ApplicationPage';
import AwsPage from './pages/AwsPage';
import DevOpsPage from './pages/DevOpsPage';
import AiMlPage from './pages/AiMlPage';
import FullStackPage from './pages/FullStackPage';
import MeanMernPage from './pages/MeanMernPage';
import AiIntegrationsPage from './pages/AiIntegrationsPage';
import WebAppPage from './pages/WebAppPage';
import FinTechPage from './pages/FinTechPage';
import SaasPage from './pages/SaasPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/aws" element={<AwsPage />} />
        <Route path="/devops" element={<DevOpsPage />} />
        <Route path="/aiml-deeplearning" element={<AiMlPage />} />
        <Route path="/fullstack-java-python" element={<FullStackPage />} />
        <Route path="/mean-mern" element={<MeanMernPage />} />
        <Route path="/ai-integrations" element={<AiIntegrationsPage />} />
        <Route path="/webapp-dev" element={<WebAppPage />} />
        <Route path="/industry-project-1" element={<FinTechPage />} />
        <Route path="/industry-project-2" element={<SaasPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;