import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, Menu, X, ArrowRight, ShieldCheck, WifiOff } from 'lucide-react';
import { NavigationTab } from '../types';
import { predictionService } from '../services/predictionService';

interface NavbarProps {
  activePage: NavigationTab;
  setActivePage: (page: NavigationTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const checkConnection = async () => {
    try {
      const status = await predictionService.getModelStatus();
      setIsOnline(status.connected);
    } catch {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (page: NavigationTab) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'data', label: 'Data Intelligence', badge: '576' },
    { id: 'models', label: 'Models & Pipeline', badge: '7 Models' },
    { id: 'predict', label: 'Prediction Studio' },
    { id: 'insights', label: 'Insights & Strategy' },
    { id: 'about', label: 'Case Study' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07080b]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Headline */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('overview')}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 p-0.5 shadow-md shadow-rose-950/40">
                <div className="w-full h-full bg-[#0d0f15] rounded-[7px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-rose-500 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#07080b]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white font-mono">
                  BLOOD<span className="text-rose-500">INTEL</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-neutral-400 border border-white/[0.08] font-mono">
                  v1.0 · PRCP-1011
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wide">
                Predicting donor behavior. Strengthening the blood supply.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-sm shadow-black/40'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/[0.04] text-neutral-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Model Status Pill */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Live Model Status */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                isOnline
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
              }`}
              title={isOnline ? 'Model service active: KNN (k=5)' : 'Model connection offline'}
            >
              {isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>KNN (k=5) Active</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span>Model Disconnected</span>
                </>
              )}
            </div>

            {/* Run Prediction CTA */}
            <button
              onClick={() => handleNavClick('predict')}
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-950/50 hover:shadow-rose-900/60 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-200" />
              <span>Run Prediction</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-200 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0c0e14] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between cursor-pointer ${
                  isActive ? 'bg-rose-500/15 text-rose-300 font-semibold' : 'text-neutral-300 hover:bg-white/[0.05]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{isOnline ? 'KNN (k=5) Active' : 'Offline'}</span>
            </div>
            <button
              onClick={() => handleNavClick('predict')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
            >
              Run Prediction
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

