import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DataIntelligencePage } from './pages/DataIntelligencePage';
import { ModelsPage } from './pages/ModelsPage';
import { PredictionPage } from './pages/PredictionPage';
import { InsightsCampaignPage } from './pages/InsightsCampaignPage';
import { AboutPage } from './pages/AboutPage';
import { NavigationTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');

  return (
    <div className="min-h-screen bg-[#07080b] text-neutral-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar activePage={activeTab} setActivePage={setActiveTab} />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'overview' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'data' && <DataIntelligencePage />}
        {activeTab === 'models' && <ModelsPage />}
        {activeTab === 'predict' && <PredictionPage />}
        {activeTab === 'insights' && <InsightsCampaignPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActiveTab} />
    </div>
  );
}
