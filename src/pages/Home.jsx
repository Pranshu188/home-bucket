import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Search, Sparkles, Home as HomeIcon, ShieldCheck, Scale, 
  Calculator as CalcIcon, Calendar, ArrowRight, UserCheck, CheckCircle2,
  Users, Star, HelpCircle
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { mockServices } from '../data/services';

export default function Home() {
  const { 
    setActivePage, 
    setSearchFilters, 
    allProperties,
    setAiRecPreferences,
    setSelectedPropertyId
  } = useContext(AppContext);

  // Search Fields
  const [searchPurpose, setSearchPurpose] = useState('Rent');
  const [searchLocality, setSearchLocality] = useState('Satellite');
  const [searchType, setSearchType] = useState('Apartment');
  const [searchBudgetMax, setSearchBudgetMax] = useState('30000');

  // AI Recommendation Wizard States
  const [aiPurpose, setAiPurpose] = useState('Rent');
  const [aiLocality, setAiLocality] = useState('Satellite');
  const [aiBhk, setAiBhk] = useState('2');
  const [aiBudget, setAiBudget] = useState(25000);
  const [aiUserSegment, setAiUserSegment] = useState('Student'); // Student, Family, Professional
  const [aiMaxDistance, setAiMaxDistance] = useState(2);
  const [aiResults, setAiResults] = useState(null);

  const ahmedabadAreas = [
    'Satellite', 'Prahlad Nagar', 'Bopal', 'Thaltej', 'Vastrapur',
    'Chandkheda', 'SG Highway', 'Navrangpura', 'Gota', 'Maninagar',
    'South Bopal', 'Shela'
  ];

  // Handle Hero Search Submit
  const handleHeroSearch = (e) => {
    e.preventDefault();
    setSearchFilters({
      purpose: searchPurpose,
      location: searchLocality,
      type: searchType,
      budgetMin: 0,
      budgetMax: parseInt(searchBudgetMax)
    });
    setActivePage('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Run AI matching algorithm locally
  const handleAiMatching = (e) => {
    e.preventDefault();
    // Filter matching listings and score them
    const scored = allProperties
      .filter(p => p.purpose === aiPurpose)
      .map(p => {
        let score = 100;
        
        // Locality mismatch penalty
        if (p.location !== aiLocality) score -= 25;
        
        // Configuration mismatch penalty
        if (p.bhk !== parseInt(aiBhk)) score -= 20;
        
        // Budget mismatch penalty
        if (p.price > aiBudget) {
          const over = ((p.price - aiBudget) / aiBudget) * 30;
          score -= Math.min(over, 30);
        }

        // Campus distance penalty
        if (aiUserSegment === 'Student' && p.distanceToCollege > aiMaxDistance) {
          score -= 15;
        }

        // Clean score boundaries
        score = Math.max(Math.min(Math.round(score), 100), 40);

        return { ...p, matchPercentage: score };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setAiResults(scored.slice(0, 3));
  };

  const handleCardClick = (id) => {
    setSelectedPropertyId(id);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center text-white">
        
        {/* Background visual graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent opacity-60"></div>
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          
          <div className="space-y-4">
            <span className="bg-blue-600/35 border border-blue-500/50 text-blue-300 font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block shadow">
              🚀 Smart Digital Housing Platform
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Your Next Home, <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">All in One Place</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Search, verify, compare, calculate, and move into your next home — without the hassle of using multiple platforms.
            </p>
          </div>

          {/* LARGE SEARCH CONTAINER */}
          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-5 rounded-3xl border border-white/15 max-w-4xl mx-auto shadow-2xl">
            
            {/* Search Tab Categories */}
            <div className="flex justify-center sm:justify-start gap-1 pb-3 mb-3 border-b border-white/10">
              {['Rent', 'Buy', 'PG'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSearchPurpose(tab);
                    setSearchBudgetMax(tab === 'Buy' ? '8500000' : '30000');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    searchPurpose === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'PG' ? '🎓 PG / Room' : tab === 'Rent' ? '🏠 Rent a Home' : '🏡 Buy a Home'}
                </button>
              ))}
            </div>

            {/* Fields Grid */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              
              {/* Location input */}
              <div className="bg-white rounded-2xl p-2.5 text-left border border-slate-200 shadow-sm flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Location Area</span>
                <select
                  value={searchLocality}
                  onChange={(e) => setSearchLocality(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 text-xs font-bold focus:outline-none mt-0.5 cursor-pointer"
                >
                  {ahmedabadAreas.map(a => (
                    <option key={a} value={a} className="text-slate-800 font-medium">{a}</option>
                  ))}
                </select>
              </div>

              {/* Property Type input */}
              <div className="bg-white rounded-2xl p-2.5 text-left border border-slate-200 shadow-sm flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Property Type</span>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 text-xs font-bold focus:outline-none mt-0.5 cursor-pointer"
                >
                  <option value="Apartment" className="text-slate-800 font-medium">Apartment</option>
                  <option value="Villa" className="text-slate-800 font-medium">Villa</option>
                  <option value="Independent House" className="text-slate-800 font-medium">Independent House</option>
                  <option value="PG" className="text-slate-800 font-medium">PG / Room</option>
                  <option value="Studio" className="text-slate-800 font-medium">Studio / Penthouse</option>
                </select>
              </div>

              {/* Budget input */}
              <div className="bg-white rounded-2xl p-2.5 text-left border border-slate-200 shadow-sm flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Max Price Budget</span>
                <select
                  value={searchBudgetMax}
                  onChange={(e) => setSearchBudgetMax(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-800 text-xs font-bold focus:outline-none mt-0.5 cursor-pointer"
                >
                  {searchPurpose === 'Buy' ? (
                    <>
                      <option value="5000000" className="text-slate-800 font-medium">₹50 Lakhs</option>
                      <option value="8500000" className="text-slate-800 font-medium">₹85 Lakhs</option>
                      <option value="15000000" className="text-slate-800 font-medium">₹1.5 Crore</option>
                      <option value="30000000" className="text-slate-800 font-medium">₹3 Crore</option>
                    </>
                  ) : (
                    <>
                      <option value="12000" className="text-slate-800 font-medium">₹12,000/mo</option>
                      <option value="20000" className="text-slate-800 font-medium">₹20,000/mo</option>
                      <option value="35000" className="text-slate-800 font-medium">₹35,000/mo</option>
                      <option value="70000" className="text-slate-800 font-medium">₹70,000/mo</option>
                    </>
                  )}
                </select>
              </div>

              {/* Search Trigger Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4.5 h-4.5" />
                Search Properties
              </button>

            </form>
          </div>

          <div className="flex justify-center items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-medium">Looking for customized results?</span>
            <a
              href="#ai-recommendations"
              className="text-xs text-blue-400 hover:text-blue-300 font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get AI Recommendations
            </a>
          </div>

        </div>
      </section>

      {/* 2. QUICK CATEGORIES SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { title: "🏠 Rent a Home", page: 'listings', filters: { purpose: 'Rent' } },
            { title: "🏡 Buy a Home", page: 'listings', filters: { purpose: 'Buy' } },
            { title: "🎓 Student Housing", page: 'listings', filters: { purpose: 'PG' } },
            { title: "🛠️ Home Services", page: 'services', filters: null },
            { title: "💰 Sell Property", page: 'sell', filters: null }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActivePage(cat.page);
                if (cat.filters) setSearchFilters(prev => ({ ...prev, ...cat.filters }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-slate-100 hover:border-blue-200 rounded-2xl p-4 text-center cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-xl block">{cat.title.split(' ')[0]}</span>
              <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">{cat.title.substring(3)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW HOME BUCKET WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How HOME BUCKET Works
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Our systematic full-funnel digital workflow process
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative">
          {[
            { num: "01", title: "Search", desc: "Tell us what you're looking for.", icon: Search },
            { num: "02", title: "Verify", desc: "Browse verified property listings.", icon: ShieldCheck },
            { num: "03", title: "Compare", desc: "Compare properties side-by-side.", icon: Scale },
            { num: "04", title: "Calculate", desc: "Understand the actual cost.", icon: CalcIcon },
            { num: "05", title: "Visit", desc: "Schedule a property visit.", icon: Calendar },
            { num: "06", title: "Move In", desc: "Complete docs & arrange services.", icon: CheckCircle2 }
          ].map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center relative flex flex-col items-center gap-2">
                <span className="absolute -top-3 left-4 text-[26px] font-extrabold text-slate-100 select-none">
                  {step.num}
                </span>
                
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mt-2">
                  <StepIcon className="w-5 h-5" />
                </div>
                
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{step.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PROPERTIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Properties</h2>
            <p className="text-xs text-slate-500 mt-0.5">Top inspected listings around Ahmedabad campuses.</p>
          </div>
          <button 
            onClick={() => { setActivePage('listings'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Explore Catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {allProperties.slice(0, 3).map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 5. WHY HOME BUCKET MARKETING SECTION */}
      <section className="bg-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800">
              Market Positioning
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              More Than a Property Search Platform
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Traditional real estate sites stop at discovery, exposing users to broker spam, hidden charges, and offline shifting hassles. HOME BUCKET re-engineers the journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "6-Point Verification", desc: "No fake photos. Verified ownership matching government registries." },
                { title: "True Utility Calculation", desc: "Maintenance, electricity, and internet cost breakdowns." },
                { title: "Active Visits Booking", desc: "Select time slots directly in the app. No annoying broker calls." },
                { title: "Integrated Move-In Portal", desc: "Book painters, cleaners, and movers in seconds." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Journey Comparison Mockup */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-indigo-950 shadow-2xl space-y-6">
            <h3 className="font-extrabold text-sm text-indigo-200 border-b border-indigo-900/50 pb-3 uppercase tracking-wider text-center">
              The Journey Shift
            </h3>

            {/* Traditional path */}
            <div className="space-y-2">
              <span className="text-[9px] text-slate-400 font-extrabold uppercase">Traditional Portals</span>
              <div className="flex items-center gap-2 text-xs bg-red-950/20 border border-red-900/40 p-3 rounded-xl">
                <span className="text-rose-500 font-extrabold">Discover Listings</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400 line-through">Fake Broker Calls</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400 line-through">Offline Shifting Stress</span>
              </div>
            </div>

            {/* Home bucket path */}
            <div className="space-y-2">
              <span className="text-[9px] text-indigo-300 font-extrabold uppercase">HOME BUCKET Workflow</span>
              <div className="flex flex-col gap-2 text-xs bg-indigo-950/40 border border-indigo-800 p-4 rounded-xl space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>1. Discover & Verify</span>
                  <span className="text-emerald-400">✓ Done</span>
                </div>
                <div className="flex justify-between font-bold text-indigo-200 border-t border-indigo-900/50 pt-2">
                  <span>2. Side-by-side Compare</span>
                  <span className="text-emerald-400">✓ Done</span>
                </div>
                <div className="flex justify-between font-bold text-indigo-200 border-t border-indigo-900/50 pt-2">
                  <span>3. Book Visits & Move In</span>
                  <span className="text-indigo-400">⚡ In-App</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. AI HOME RECOMMENDATIONS */}
      <section id="ai-recommendations" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Property Recommendation Wizard
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Tell us what you need. Our local algorithm computes the best matched homes.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Preferences Wizard Form */}
          <form onSubmit={handleAiMatching} className="md:col-span-5 space-y-4">
            <h4 className="font-extrabold text-xs text-slate-700 uppercase border-b border-slate-100 pb-2">
              Step 1: Preference Wizard
            </h4>

            {/* Purpose */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Renting or Buying?</label>
              <select
                value={aiPurpose}
                onChange={(e) => setAiPurpose(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
                <option value="PG">Student PG</option>
              </select>
            </div>

            {/* Preferred Location */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Ahmedabad Locality</label>
              <select
                value={aiLocality}
                onChange={(e) => setAiLocality(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {ahmedabadAreas.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* BHK config */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">BHK Configuration</label>
              <select
                value={aiBhk}
                onChange={(e) => setAiBhk(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-bold focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            {/* Budget price */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Monthly Budget</span>
                <span className="text-blue-600 font-extrabold">₹{aiBudget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={aiPurpose === 'Buy' ? 1500000 : 5000}
                max={aiPurpose === 'Buy' ? 25000000 : 40000}
                step={aiPurpose === 'Buy' ? 200000 : 1000}
                value={aiBudget}
                onChange={(e) => setAiBudget(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Target Segment */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">I am a...</label>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-600">
                {['Student', 'Professional', 'Family'].map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setAiUserSegment(role)}
                    className={`py-1.5 rounded-lg border transition-all ${
                      aiUserSegment === role 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-extrabold' 
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              Find My Perfect Home
            </button>
          </form>

          {/* Matches Output Pane */}
          <div className="md:col-span-7 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-inner flex flex-col justify-center min-h-[300px]">
            
            {aiResults === null ? (
              <div className="text-center text-slate-400 text-xs py-8 space-y-2">
                <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
                <p>Fill out the preferences wizard and click search to generate matching properties.</p>
              </div>
            ) : aiResults.length === 0 ? (
              <div className="text-center text-slate-400 text-xs">
                No properties matching your configurations found.
              </div>
            ) : (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200">
                  Best Matching Results
                </h4>

                {aiResults.map((prop) => (
                  <div 
                    key={prop.id} 
                    onClick={() => handleCardClick(prop.id)}
                    className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-3 justify-between cursor-pointer group"
                  >
                    <div className="flex gap-2">
                      <img 
                        src={prop.image} 
                        alt={prop.name} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {prop.name}
                        </h5>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          <span>{prop.location} • {prop.bhk} BHK</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-[10px] text-blue-600 font-extrabold">
                          {prop.matchPercentage}% Match
                        </span>
                        <span className="text-[9px] text-slate-400 leading-normal">
                          {prop.matchPercentage > 90 ? 'Ideal match' : 'Good match'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 7. TRUE COST CALCULATOR TEASER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-100 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="p-4 bg-blue-100 text-blue-800 rounded-2xl">
          <CalcIcon className="w-12 h-12" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            True Monthly Housing Cost Calculator
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xl">
            Renting or buying a house involves more than just price. Society maintenance, utility bills, parking rates, and internet plans quickly stack up. Use our sliders to check total expenses.
          </p>
        </div>
        <button
          onClick={() => { setActivePage('calculator'); window.scrollTo({top:0, behavior:'smooth'}); }}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs py-3 px-6 rounded-xl transition-all shadow-md cursor-pointer w-full md:w-auto"
        >
          Open Cost Calculator
        </button>
      </section>

      {/* 8. TARGET USERS SECTIONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Built for Everyone Looking for a Better Home Search
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Curated listings matching different lifestyles and budgets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "🎓 Students & Roommates", desc: "Find verified PGs, studio rooms, and flat-sharing configurations near major Ahmedabad campuses with meal plans.", icon: "🎓" },
            { title: "👪 Safe Homes for Families", desc: "Explore spacious multi-BHK apartments and independent villas with playground safety and school proximities.", icon: "👪" },
            { title: "💼 Working Professionals", desc: "Locate executive flats and co-living rentals close to corporate parks and transit lines with 100% utility cost breakdowns.", icon: "💼" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRUST & STATISTICS SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Properties Listed', val: '10,000+' },
            { label: 'Verified Listings', val: '5,000+' },
            { label: 'Active Users', val: '2,000+' },
            { label: 'Service Partners', val: '500+' }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <h4 className="text-3xl font-extrabold text-blue-600">{stat.val}</h4>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Ready to Find Your Next Home?
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Stop searching across multiple fragmented portals. Start your entire verified housing journey today with HOME BUCKET.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => { setActivePage('listings'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Catalog
          </button>
          <a
            href="#ai-recommendations"
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Get AI Recommendations
          </a>
        </div>
      </section>

    </div>
  );
}
