import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { SlidersHorizontal, MapPin, Grid, Compass, ArrowUpDown, Clock } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function Listings() {
  const { allProperties, searchFilters, setSearchFilters } = useContext(AppContext);
  
  // Sort State
  const [sortBy, setSortBy] = useState('Recommended');
  
  // Filter States (initialized from searchFilters context)
  const [filterPurpose, setFilterPurpose] = useState(searchFilters.purpose || 'Rent');
  const [filterLocality, setFilterLocality] = useState(searchFilters.location || 'Any');
  const [filterType, setFilterType] = useState('Any');
  const [filterBhk, setFilterBhk] = useState('Any');
  const [filterPriceMax, setFilterPriceMax] = useState(filterPurpose === 'Buy' ? 30000000 : 40000);
  const [filterFurnishing, setFilterFurnishing] = useState('Any');
  const [filterMaxDistance, setFilterMaxDistance] = useState(10); // max distance in km
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterOwnerOnly, setFilterOwnerOnly] = useState(false);

  const ahmedabadAreas = [
    'Satellite', 'Prahlad Nagar', 'Bopal', 'Thaltej', 'Vastrapur',
    'Chandkheda', 'SG Highway', 'Navrangpura', 'Gota', 'Maninagar',
    'South Bopal', 'Shela'
  ];

  // Active property marker highlighting in the map mockup
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);

  // Apply filters
  const filteredList = allProperties.filter((p) => {
    // Purpose filter
    if (filterPurpose !== 'Any' && p.purpose !== filterPurpose) return false;
    
    // Locality filter
    if (filterLocality !== 'Any' && filterLocality !== 'Ahmedabad' && p.location !== filterLocality) return false;
    
    // Type filter
    if (filterType !== 'Any' && p.type !== filterType) return false;
    
    // BHK filter
    if (filterBhk !== 'Any' && p.bhk !== parseInt(filterBhk)) return false;
    
    // Price filter
    if (p.price > filterPriceMax) return false;
    
    // Furnishing filter
    if (filterFurnishing !== 'Any' && p.furnishing !== filterFurnishing) return false;
    
    // Distance filter
    if (p.distanceToCollege > filterMaxDistance) return false;
    
    // Verified Only filter
    if (filterVerifiedOnly && p.verifiedStatus !== 'Verified') return false;

    // Owner Listed only
    if (filterOwnerOnly && p.ownerType !== 'Owner') return false;

    return true;
  });

  // Apply Sorting
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'Price Low → High') return a.price - b.price;
    if (sortBy === 'Price High → Low') return b.price - a.price;
    if (sortBy === 'Newest') return b.id - a.id;
    return 0; // Default Recommended / Most Relevant matches database order
  });

  const handleResetFilters = () => {
    setFilterPurpose('Any');
    setFilterLocality('Any');
    setFilterType('Any');
    setFilterBhk('Any');
    setFilterPriceMax(30000000);
    setFilterFurnishing('Any');
    setFilterMaxDistance(10);
    setFilterVerifiedOnly(false);
    setFilterOwnerOnly(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Listings Header controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <h2 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
              Filter Catalog ({sortedList.length} properties)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Purpose toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['Any', 'Rent', 'Buy', 'PG'].map(purpose => (
                <button
                  key={purpose}
                  onClick={() => {
                    setFilterPurpose(purpose);
                    setFilterPriceMax(purpose === 'Buy' ? 30000000 : 40000);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded ${filterPurpose === purpose ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {purpose}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-1.5 ml-auto md:ml-0 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option>Recommended</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

        </div>

        {/* Listings Content Grid: Left Filters, Center Cards, Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR FILTERS (Col span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Search Filters</h3>
                <button 
                  onClick={handleResetFilters}
                  className="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Locality select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Locality Area</label>
                <select
                  value={filterLocality}
                  onChange={(e) => setFilterLocality(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                >
                  <option value="Any">All Areas (Ahmedabad)</option>
                  {ahmedabadAreas.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Property Type select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Property Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                >
                  <option value="Any">All Types</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Independent House</option>
                  <option>PG</option>
                  <option>Studio</option>
                </select>
              </div>

              {/* BHK configuration select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">BHK Size</label>
                <select
                  value={filterBhk}
                  onChange={(e) => setFilterBhk(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                >
                  <option value="Any">All Configurations</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
              </div>

              {/* Price Max Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Max Price Budget</span>
                  <span className="text-blue-600 font-extrabold text-[11px]">
                    {filterPurpose === 'Buy' 
                      ? `₹${(filterPriceMax / 10000000).toFixed(2)} Cr` 
                      : `₹${filterPriceMax.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={filterPurpose === 'Buy' ? 1000000 : 5000}
                  max={filterPurpose === 'Buy' ? 30000000 : 50000}
                  step={filterPurpose === 'Buy' ? 500000 : 1000}
                  value={filterPriceMax}
                  onChange={(e) => setFilterPriceMax(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Furnishing select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Furnishing State</label>
                <select
                  value={filterFurnishing}
                  onChange={(e) => setFilterFurnishing(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-blue-500 font-semibold"
                >
                  <option value="Any">All Furnishing</option>
                  <option>Fully Furnished</option>
                  <option>Semi-Furnished</option>
                  <option>Unfurnished</option>
                </select>
              </div>

              {/* Distance from college Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Proximity to Campus/Work</span>
                  <span className="text-blue-600 font-extrabold text-[11px]">&lt; {filterMaxDistance} km</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={filterMaxDistance}
                  onChange={(e) => setFilterMaxDistance(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                
                {/* Verified Only */}
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={filterVerifiedOnly}
                    onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-1">🛡️ Verified Properties Only</span>
                </label>

                {/* Owner listed only */}
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={filterOwnerOnly}
                    onChange={(e) => setFilterOwnerOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span>🙋 Listed by Owners Only</span>
                </label>

              </div>
            </div>
          </div>

          {/* MAIN LISTINGS RESULTS GRID (Col span 5) */}
          <div className="lg:col-span-6 space-y-4">
            {sortedList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedList.map((prop) => (
                  <div 
                    key={prop.id}
                    onMouseEnter={() => setHoveredPropertyId(prop.id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                    className={`transition-all duration-300 rounded-2xl ${
                      hoveredPropertyId === prop.id ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.01]' : ''
                    }`}
                  >
                    <PropertyCard property={prop} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs border border-slate-100 shadow-sm">
                No properties match your active search filters. Try adjusting your price budget or widening your locality area.
              </div>
            )}
          </div>

          {/* RIGHT SIDE MAP PLACEHOLDER (Col span 3) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4 sticky top-20">
              
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 border-b border-slate-100 pb-2">
                <span className="flex items-center gap-1">
                  <Compass className="w-4 h-4 text-blue-600" />
                  Ahmedabad Satellite Map
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Interactive</span>
              </div>

              {/* Map Canvas Mockup */}
              <div className="h-96 rounded-2xl bg-sky-100 border border-sky-200 relative overflow-hidden shadow-inner flex items-center justify-center">
                {/* SVG mock map background grid */}
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Mock water lake */}
                  <circle cx="150" cy="180" r="50" fill="#bae6fd" opacity="0.6" />
                  {/* Mock road grids */}
                  <line x1="0" y1="120" x2="300" y2="120" stroke="#f1f5f9" strokeWidth="6" />
                  <line x1="120" y1="0" x2="120" y2="400" stroke="#f1f5f9" strokeWidth="6" />
                  <line x1="0" y1="280" x2="300" y2="280" stroke="#f1f5f9" strokeWidth="8" />
                </svg>

                {/* Map markers for filtered list */}
                {sortedList.slice(0, 7).map((prop, idx) => {
                  // Coordinate multipliers
                  const markerPositions = [
                    { top: '25%', left: '30%' },
                    { top: '40%', left: '60%' },
                    { top: '65%', left: '20%' },
                    { top: '15%', left: '75%' },
                    { top: '55%', left: '45%' },
                    { top: '75%', left: '70%' },
                    { top: '30%', left: '80%' }
                  ];

                  const pos = markerPositions[idx % markerPositions.length];
                  const isHovered = hoveredPropertyId === prop.id;

                  return (
                    <div
                      key={prop.id}
                      style={{ top: pos.top, left: pos.left }}
                      onMouseEnter={() => setHoveredPropertyId(prop.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-200 ${
                        isHovered ? 'scale-110' : ''
                      }`}
                    >
                      {/* Marker bubble */}
                      <div className={`flex items-center gap-1 py-1 px-2 rounded-full font-bold shadow-md text-[9px] border border-white ${
                        isHovered 
                          ? 'bg-blue-600 text-white scale-105' 
                          : prop.verifiedStatus === 'Verified'
                          ? 'bg-white text-emerald-700 hover:bg-emerald-50'
                          : 'bg-white text-slate-700 hover:bg-slate-50'
                      }`}>
                        <MapPin className={`w-2.5 h-2.5 ${prop.verifiedStatus === 'Verified' ? 'text-emerald-500 fill-emerald-100' : 'text-blue-500'}`} />
                        <span>
                          {prop.price >= 10000000 
                            ? `${(prop.price / 10000000).toFixed(1)}Cr` 
                            : prop.price >= 100000 
                            ? `${Math.round(prop.price / 100000)}L`
                            : `₹${Math.round(prop.price / 1000)}k`}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur px-2.5 py-1 rounded text-[8px] font-bold text-slate-500 border border-slate-100">
                  Ahmedabad Core (BRTS grids)
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
