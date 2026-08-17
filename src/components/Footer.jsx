import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Footer() {
  const { setActivePage, setSearchFilters } = useContext(AppContext);

  const handleNavClick = (pageName, filters = null) => {
    setActivePage(pageName);
    if (filters) {
      setSearchFilters(prev => ({ ...prev, ...filters }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
              <span className="text-2xl">🏠</span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                HOME BUCKET
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ahmedabad's smart property platform combining Renting, Buying, Verification, Comparison, EMI calculation, and Moving services.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold bg-blue-950/50 border border-blue-900/50 w-max px-3 py-1 rounded-full">
              🛡️ "Find. Verify. Move In."
            </div>
          </div>

          {/* Nav Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Properties</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNavClick('listings', { purpose: 'Rent' })} className="hover:text-blue-400 transition-colors">
                  Rent Homes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('listings', { purpose: 'Buy' })} className="hover:text-blue-400 transition-colors">
                  Buy Homes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('listings', { purpose: 'PG' })} className="hover:text-blue-400 transition-colors">
                  Student Housing (PG)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('sell')} className="hover:text-blue-400 transition-colors">
                  List Your Property
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Smart Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNavClick('compare')} className="hover:text-blue-400 transition-colors">
                  Property Comparison
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-blue-400 transition-colors">
                  AI Home Finder
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-blue-400 transition-colors">
                  True Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-blue-400 transition-colors">
                  Move-In Home Services
                </button>
              </li>
            </ul>
          </div>

          {/* About / BBA Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Project Info</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition-colors">
                  USP & Revenue Model
                </button>
              </li>
              <li>
                <span className="text-slate-400">Ahmedabad, Gujarat, IN</span>
              </li>
              <li>
                <span className="text-slate-500 italic">BBA Marketing Management Group Project</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 HOME BUCKET. Developed for College Presentation purposes. Mock Data Only.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer font-bold text-blue-400 select-none">MVP Prototype v1.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
