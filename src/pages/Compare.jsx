import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Scale, Trash2, ShieldCheck, MapPin, Sparkles, Building, ArrowLeft, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function Compare() {
  const { compareList, removeFromCompare, setActivePage, allProperties } = useContext(AppContext);
  const [prioritizeOption, setPrioritizeOption] = useState('Price'); // 'Price', 'Distance', 'Space'

  const formatPrice = (val, purpose) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}${purpose === 'Rent' || purpose === 'PG' ? '/mo' : ''}`;
  };

  const getBestMatch = () => {
    if (compareList.length === 0) return null;
    let best = compareList[0];
    compareList.forEach(p => {
      if (prioritizeOption === 'Price') {
        if (p.price < best.price) best = p;
      } else if (prioritizeOption === 'Distance') {
        if (p.distanceToCollege < best.distanceToCollege) best = p;
      } else if (prioritizeOption === 'Space') {
        if (p.area > best.area) best = p;
      }
    });
    return best;
  };

  const bestMatch = getBestMatch();

  // Helper to determine if a value is "better" (cheaper price, smaller distance, larger area)
  const isBetterValue = (property, key) => {
    if (compareList.length < 2) return false;
    const values = compareList.map(p => p[key]);
    if (key === 'price' || key === 'distanceToCollege') {
      return property[key] === Math.min(...values);
    }
    if (key === 'area') {
      return property[key] === Math.max(...values);
    }
    return false;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">
              ⚖️ Side-by-Side Analytics
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Properties
            </h1>
            <p className="text-sm text-slate-500">
              Evaluate listings side-by-side to make an analytical, value-driven choice.
            </p>
          </div>

          <button 
            onClick={() => setActivePage('listings')}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </button>
        </div>

        {compareList.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-xl text-center space-y-6 max-w-lg mx-auto">
            <div className="inline-flex p-4 bg-indigo-50 text-indigo-700 rounded-full">
              <Scale className="w-16 h-16" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-lg text-slate-800">Your Comparison Bucket is Empty</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                Add properties to compare by clicking the **Compare** button on any card in the property catalog.
              </p>
            </div>
            <button
              onClick={() => setActivePage('listings')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-md"
            >
              Browse Property Listings
            </button>
          </div>
        ) : (
          /* Comparison Grid & Table */
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Priority Selector & Best Match */}
            <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs text-indigo-200 font-bold uppercase tracking-wider block">Intelligence Assist</span>
                <h3 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-300" />
                  Best Match Recommendation
                </h3>
                <p className="text-xs text-indigo-100 max-w-md leading-relaxed">
                  Based on your current filter preference, we recommend **{bestMatch.name}** in {bestMatch.location}.
                </p>
              </div>

              {/* Toggle Preference */}
              <div className="flex bg-indigo-950 p-1.5 rounded-xl gap-1">
                {[
                  { label: 'Cheapest Cost', val: 'Price' },
                  { label: 'Closest Location', val: 'Distance' },
                  { label: 'Largest Area', val: 'Space' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setPrioritizeOption(opt.val)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      prioritizeOption === opt.val
                        ? 'bg-white text-indigo-950 shadow-sm'
                        : 'text-indigo-200 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Side by side Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compareList.map((prop) => (
                <div key={prop.id} className="relative bg-white rounded-3xl p-4 border border-slate-100 shadow-md">
                  <button
                    onClick={() => removeFromCompare(prop.id)}
                    className="absolute top-2 right-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 p-2 rounded-full z-10 transition-colors border border-slate-200 shadow-sm"
                    title="Remove from compare"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <PropertyCard property={prop} />
                </div>
              ))}
            </div>

            {/* Matrix comparison Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50">
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Features Grid</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="p-4 text-xs font-bold text-slate-500 w-1/4">Specification</th>
                      {compareList.map(p => (
                        <th key={p.id} className="p-4 text-xs font-extrabold text-slate-800 w-1/4">
                          {p.name.split(' ').slice(0, 3).join(' ')}...
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-100">
                    
                    {/* Price Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Base Cost</td>
                      {compareList.map(p => {
                        const isBest = isBetterValue(p, 'price');
                        return (
                          <td key={p.id} className={`p-4 font-bold ${isBest ? 'text-emerald-600 bg-emerald-50/30' : 'text-slate-800'}`}>
                            {formatPrice(p.price, p.purpose)}
                            {isBest && <span className="text-[9px] ml-1 bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-extrabold">Best</span>}
                          </td>
                        );
                      })}
                    </tr>

                    {/* BHK Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">BHK Layout</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-4 text-slate-700 font-medium">
                          {p.bhk} BHK
                        </td>
                      ))}
                    </tr>

                    {/* Area Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Super Area</td>
                      {compareList.map(p => {
                        const isBest = isBetterValue(p, 'area');
                        return (
                          <td key={p.id} className={`p-4 font-bold ${isBest ? 'text-emerald-600 bg-emerald-50/30' : 'text-slate-800'}`}>
                            {p.area} sq ft
                            {isBest && <span className="text-[9px] ml-1 bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-extrabold">Largest</span>}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Locality Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Ahmedabad Area</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-4 text-slate-700 font-medium">
                          {p.location}
                        </td>
                      ))}
                    </tr>

                    {/* Maintenance Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Monthly Maintenance</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-4 text-slate-700">
                          ₹{(p.calculator?.maintenance || 0).toLocaleString('en-IN')}
                        </td>
                      ))}
                    </tr>

                    {/* Furnished Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Furnishing</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-4 text-slate-700 font-medium">
                          {p.furnishing}
                        </td>
                      ))}
                    </tr>

                    {/* Distance to college/work Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Campus Proximity</td>
                      {compareList.map(p => {
                        const isBest = isBetterValue(p, 'distanceToCollege');
                        return (
                          <td key={p.id} className={`p-4 font-bold ${isBest ? 'text-emerald-600 bg-emerald-50/30' : 'text-slate-800'}`}>
                            {p.distanceToCollege} km
                            {isBest && <span className="text-[9px] ml-1 bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-extrabold">Closest</span>}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Verification Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Verification Status</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-4 font-bold text-slate-700">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                            p.verifiedStatus === 'Verified' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : p.verifiedStatus === 'Verification Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {p.verifiedStatus}
                          </span>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
