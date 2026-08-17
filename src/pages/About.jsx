import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Target, TrendingUp, Award, Users, AlertOctagon, HelpCircle } from 'lucide-react';

export default function About() {
  const { setActivePage } = useContext(AppContext);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
            🏛️ BBA Marketing Management Presentation
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Startup Pitch: <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">HOME BUCKET</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            "Your Next Home, All in One Place." – Re-imagining the fragmented housing journey.
          </p>
        </div>

        {/* Presentation Nav Shortcuts */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Try the Interactive MVP Prototypes</h3>
            <p className="text-blue-100 text-sm mt-1">Directly demonstrate key features to your professor.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { setActivePage('listings'); window.scrollTo({top:0, behavior:'smooth'}); }}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold shadow transition-all active:scale-95"
            >
              Verify Listing Map
            </button>
            <button 
              onClick={() => { setActivePage('compare'); window.scrollTo({top:0, behavior:'smooth'}); }}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold shadow transition-all active:scale-95"
            >
              Compare Matrix
            </button>
            <button 
              onClick={() => { setActivePage('services'); window.scrollTo({top:0, behavior:'smooth'}); }}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold shadow transition-all active:scale-95"
            >
              Move-In Portal
            </button>
          </div>
        </div>

        {/* Business Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: The Problem & The Solution */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-bold mb-2">
                <AlertOctagon className="w-5 h-5" />
                <span>The Core Problem</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">The Fragmented Housing Journey</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Currently, home seekers are forced to jump between **discovery portals** (listings), **offline inspectors** (trust verification), **spreadsheets** (hidden utility cost calculator), **messengers** (booking visits), and **packers/movers** (services). This leads to information asymmetry, fake listings, and extreme mental exhaustion.
              </p>
            </div>
            
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span>The HOME BUCKET Solution</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">One Unified Full-Funnel Journey</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                HOME BUCKET brings all components onto a single, trusted workflow. From discovering verified properties and checking safety scores to calculating real utility-inclusive EMIs, booking inspections, and ordering painters or electricians — we take you from **"Search to Move In"** under one brand.
              </p>
            </div>
          </div>

          {/* Section 2: Revenue Model */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <TrendingUp className="w-5 h-5" />
                <span>Monetization Strategy</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">How HOME BUCKET Generates Revenue</h3>
              <p className="text-slate-600 text-sm mt-2">
                A highly scalable, multi-channel monetization model matching high-value transactions:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  { title: "Premium Listings", desc: "Owners pay to bump their properties to the top of search queries.", icon: "⭐" },
                  { title: "Verification Audits", desc: "Charging small fees for executing official verified status badges.", icon: "🛡️" },
                  { title: "Broker Subscriptions", desc: "Premium lead management dashboard and priority notification alerts.", icon: "💼" },
                  { title: "Service Commission", desc: "10-15% cut on bookings of movers, cleaners, and installers.", icon: "🚚" },
                  { title: "Financial Referrals", desc: "Affiliate payouts from banks for home loans & deposit insurances.", icon: "💰" },
                  { title: "AD Placement", desc: "Targeted banners for home furnishing brands and decorators.", icon: "📢" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-base mr-1.5">{item.icon}</span>
                    <span className="font-bold text-xs text-slate-800 block sm:inline">{item.title}</span>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* USP Detail Section */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex p-3 bg-indigo-50 rounded-full text-indigo-700">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800">Our USP: "More Than A Discovery Portal"</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
            Unlike MagicBricks or NoBroker which end their services as soon as a telephone number is exchanged, HOME BUCKET accompanies the customer until they unpack their last box. Our value proposition lies in **transparency, absolute trust verification, and service aggregation.**
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-blue-50/50 rounded-xl text-center">
              <h4 className="font-bold text-lg text-blue-700">10,000+</h4>
              <p className="text-xs text-slate-500 font-medium">Ahmedabad Listings</p>
            </div>
            <div className="p-4 bg-indigo-50/50 rounded-xl text-center">
              <h4 className="font-bold text-lg text-indigo-700">6-Point</h4>
              <p className="text-xs text-slate-500 font-medium">Verification System</p>
            </div>
            <div className="p-4 bg-purple-50/50 rounded-xl text-center">
              <h4 className="font-bold text-lg text-purple-700">100%</h4>
              <p className="text-xs text-slate-500 font-medium">True Cost Analysis</p>
            </div>
            <div className="p-4 bg-emerald-50/50 rounded-xl text-center">
              <h4 className="font-bold text-lg text-emerald-700">End-To-End</h4>
              <p className="text-xs text-slate-500 font-medium">Move-In Services</p>
            </div>
          </div>
        </div>

        {/* Target Users Segment */}
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Target Customer Segments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "🎓 Students & PGs", desc: "Searching for cheap, fully-furnished, double-sharing rooming, located walking distance to university campuses (e.g. Navrangpura/Gota)." },
              { title: "💼 Young Professionals", desc: "Requiring studio flats, high safety metrics, and minimal commute time to tech hubs along the SG Highway." },
              { title: "👪 Families", desc: "Demanding verified independent houses, high lifestyle neighbourhood scores, and multi-BHK setups near schools." }
            ].map((usr, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm text-left">
                <h4 className="font-bold text-sm text-slate-900 mb-2 border-b border-slate-100 pb-2">{usr.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{usr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Group Credits */}
        <div className="bg-slate-950 text-slate-300 rounded-3xl p-8 text-center space-y-4">
          <Users className="w-10 h-10 mx-auto text-blue-500" />
          <h3 className="text-white text-xl font-bold">Gujarat Technological University — Marketing Management Project</h3>
          <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
            Presented by: 1) Jhanvi Rahevar &nbsp; 2) Dhruvi Panchal &nbsp; 3) Heli Prrajapati &nbsp; 4) Pranshu Chaudhary &nbsp; 5) Daksh Babariya
          </p>
          <p className="text-blue-400 text-xs font-bold">
            Submitted to: Assistant Professor Hetal Rathod
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 uppercase tracking-widest">
            Home Bucket © 2026 — School of Management Studies
          </div>
        </div>

      </div>
    </div>
  );
}
