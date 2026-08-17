import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import Details from './pages/Details';
import Compare from './pages/Compare';
import Calculator from './pages/Calculator';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import SellProperty from './pages/SellProperty';
import About from './pages/About';

function AppContent() {
  const { activePage } = useContext(AppContext);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'listings':
        return <Listings />;
      case 'details':
        return <Details />;
      case 'compare':
        return <Compare />;
      case 'calculator':
        return <Calculator />;
      case 'dashboard':
        return <Dashboard />;
      case 'services':
        return <Services />;
      case 'sell':
        return <SellProperty />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      <Navbar />
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      <Footer />
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
