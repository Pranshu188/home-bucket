import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Scale, User, Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar() {
  const { 
    activePage, 
    setActivePage, 
    favorites, 
    compareList, 
    currentUser, 
    setShowLogin, 
    handleLogout,
    setSearchFilters
  } = useContext(AppContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageName, filters = null) => {
    setActivePage(pageName);
    if (filters) {
      setSearchFilters(prev => ({ ...prev, ...filters }));
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Rent', page: 'listings', filters: { purpose: 'Rent' } },
    { label: 'Buy', page: 'listings', filters: { purpose: 'Buy' } },
    { label: 'Sell', page: 'sell' },
    { label: 'Services', page: 'services' },
    { label: 'Compare', page: 'compare' },
    { label: 'How It Works', page: 'about' }
  ];

  return (
    <header className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-slate-100 z-[90] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-2xl">🏠</span>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              HOME BUCKET
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {navItems.map((item, idx) => {
              const isSelected = activePage === item.page || 
                (item.page === 'listings' && activePage === 'listings'); // Simplify highlight
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.page, item.filters)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isSelected
                      ? 'text-blue-700 bg-blue-50/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Compare shortcut */}
            <button
              onClick={() => handleNavClick('compare')}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              title="Compare Properties"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Saved shortcut */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5 text-red-500" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>

            <span className="h-6 w-px bg-slate-200"></span>

            {/* Auth status / Dashboard button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center rounded-full text-[10px] font-bold uppercase shadow-inner">
                    {currentUser.name.substring(0, 2)}
                  </div>
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-500/10 active:scale-95"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={() => handleNavClick('compare')}
                className="relative p-1.5 text-slate-500"
              >
                <Scale className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {compareList.length}
                </span>
              </button>
            )}

            {favorites.length > 0 && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="relative p-1.5 text-slate-500"
              >
                <Heart className="w-5 h-5 text-red-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md py-3 px-4 space-y-2 absolute top-16 left-0 right-0 shadow-lg z-50 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.page, item.filters)}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-all flex items-center"
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-slate-100 pt-3 my-1"></div>
          {currentUser ? (
            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full bg-blue-50 text-blue-700 py-2.5 rounded-lg text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to User Dashboard</span>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full border border-slate-200 text-slate-500 py-2.5 rounded-lg text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({currentUser.name})</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold text-center"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}
