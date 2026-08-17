import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Scale, MapPin, Check, Plus, AlertCircle, Clock } from 'lucide-react';
import VerificationModal from './VerificationModal';

export default function PropertyCard({ property }) {
  const { 
    favorites, 
    toggleFavorite, 
    compareList, 
    addToCompare, 
    setActivePage, 
    setSelectedPropertyId 
  } = useContext(AppContext);

  const [isVerModalOpen, setIsVerModalOpen] = useState(false);

  const isFavorited = favorites.includes(property.id);
  const isInCompare = compareList.some(p => p.id === property.id);

  const formatPrice = (val, purpose) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}${purpose === 'Rent' || purpose === 'PG' ? '/month' : ''}`;
  };

  const handleCardClick = () => {
    setSelectedPropertyId(property.id);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 relative">
      
      {/* Property Image & Overlays */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={property.image} 
          alt={property.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={handleCardClick}
        />
        
        {/* Purpose Badge (Buy/Rent/PG) */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
          For {property.purpose}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 ${
            isFavorited 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFavorited ? "currentColor" : "none"} />
        </button>

        {/* Verification Status Banner Clickable */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsVerModalOpen(true);
          }}
          className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md cursor-pointer transition-all duration-200 active:scale-95 ${
            property.verifiedStatus === 'Verified' 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
              : property.verifiedStatus === 'Verification Pending'
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-rose-500 hover:bg-rose-600 text-white'
          }`}
        >
          {property.verifiedStatus === 'Verified' ? (
            <>🛡️ Verified</>
          ) : property.verifiedStatus === 'Verification Pending' ? (
            <><Clock className="w-3 h-3 inline" /> Pending</>
          ) : (
            <><AlertCircle className="w-3 h-3 inline" /> Unverified</>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col">
        
        {/* Price & Area */}
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(property.price, property.purpose)}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {property.area} sq ft
          </span>
        </div>

        {/* Name & Location */}
        <h4 
          className="font-bold text-sm text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-1 mb-1 transition-colors"
          onClick={handleCardClick}
        >
          {property.name}
        </h4>
        
        <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" />
          <span>{property.location}, {property.city}</span>
        </div>

        {/* Specs (BHK, Bathrooms, Furnishing) */}
        <div className="grid grid-cols-3 gap-1 py-2 px-2.5 bg-slate-50 rounded-xl text-center text-[11px] text-slate-600 font-semibold mb-4 border border-slate-100">
          <div>
            <span className="block text-slate-400 font-medium text-[9px] uppercase">Rooms</span>
            {property.bhk} BHK
          </div>
          <div className="border-x border-slate-200">
            <span className="block text-slate-400 font-medium text-[9px] uppercase">Baths</span>
            {property.bathrooms} Bath
          </div>
          <div>
            <span className="block text-slate-400 font-medium text-[9px] uppercase">Furnish</span>
            {property.furnishing.split(' ')[0]}
          </div>
        </div>

        {/* Action Toggles */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          
          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(property);
            }}
            className={`flex items-center gap-1 text-xs font-bold py-1.5 px-3 rounded-lg border transition-all ${
              isInCompare 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isInCompare ? (
              <>
                <Check className="w-3.5 h-3.5 text-indigo-700" />
                Added
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5" />
                Compare
              </>
            )}
          </button>

          {/* Details Page Trigger */}
          <button
            onClick={handleCardClick}
            className="text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 py-1.5 px-3.5 rounded-lg transition-all"
          >
            Details
          </button>
        </div>
      </div>

      {/* Verification Details Modal */}
      <VerificationModal 
        isOpen={isVerModalOpen} 
        onClose={() => setIsVerModalOpen(false)} 
        property={property} 
      />
    </div>
  );
}
