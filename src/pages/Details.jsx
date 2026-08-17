import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Heart, Scale, Calendar, Phone, ArrowLeft, ShieldCheck, MapPin, 
  Bed, Bath, Minimize, Sofa, ParkingCircle, CheckCircle2, Star, Clock 
} from 'lucide-react';
import VerificationModal from '../components/VerificationModal';

export default function Details() {
  const { 
    selectedPropertyId, 
    allProperties, 
    toggleFavorite, 
    favorites, 
    compareList, 
    addToCompare, 
    bookVisit, 
    setActivePage,
    currentUser,
    setShowLogin
  } = useContext(AppContext);

  const [isVerModalOpen, setIsVerModalOpen] = useState(false);
  
  // Booking visit states
  const [showBookingBox, setShowBookingBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const property = allProperties.find(p => p.id === selectedPropertyId) || allProperties[0];

  if (!property) {
    return (
      <div className="py-12 text-center text-xs text-slate-500">
        Property details not found.
      </div>
    );
  }

  const isFavorited = favorites.includes(property.id);
  const isInCompare = compareList.some(p => p.id === property.id);

  const formatPrice = (val, purpose) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}${purpose === 'Rent' || purpose === 'PG' ? '/month' : ''}`;
  };

  const handleBookingConfirm = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    bookVisit(property, selectedDate, selectedTime);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBookingBox(false);
    }, 4000);
  };

  const timeSlots = ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation back bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => { setActivePage('listings'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </button>

          <div className="flex items-center gap-2">
            
            {/* Compare Button */}
            <button
              onClick={() => addToCompare(property)}
              className={`p-2 rounded-xl border transition-all ${
                isInCompare 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Add to comparison list"
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorited 
                  ? 'bg-red-50 border-red-200 text-red-500' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Save to favorites"
            >
              <Heart className="w-4 h-4" fill={isFavorited ? "currentColor" : "none"} />
            </button>

          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image, Info, Neighbourhood */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Photo Gallery */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4">
              <div className="h-96 rounded-2xl overflow-hidden bg-slate-100 relative">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow">
                  For {property.purpose}
                </span>

                <div 
                  onClick={() => setIsVerModalOpen(true)}
                  className={`absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all ${
                    property.verifiedStatus === 'Verified' 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  {property.verifiedStatus === 'Verified' ? '🛡️ HOME BUCKET Verified' : '⏳ Verification Pending'}
                </div>
              </div>
            </div>

            {/* Core Specs Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
                    {property.name}
                  </h1>
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-600 whitespace-nowrap">
                    {formatPrice(property.price, property.purpose)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <MapPin className="w-4.5 h-4.5 text-blue-500" />
                  <span>{property.location}, {property.city}</span>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Bed className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">BHK Layout</span>
                    <span className="text-xs font-extrabold">{property.bhk} BHK</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Bath className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Bathrooms</span>
                    <span className="text-xs font-extrabold">{property.bathrooms} Bath</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Minimize className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Super Area</span>
                    <span className="text-xs font-extrabold">{property.area} sq ft</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Sofa className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Furnishing</span>
                    <span className="text-xs font-extrabold">{property.furnishing}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Description</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((am, i) => (
                    <span key={i} className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                      ✨ {am}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* NEIGHBOURHOOD INSIGHTS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
                <span>📍</span> What's Around This Home?
              </h3>

              {/* Scores bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { name: 'Safety Score', score: property.neighbourhood.safety, color: 'bg-emerald-500 text-emerald-600 border-emerald-100' },
                  { name: 'Public Transit', score: property.neighbourhood.transit, color: 'bg-blue-500 text-blue-600 border-blue-100' },
                  { name: 'Lifestyle & Parks', score: property.neighbourhood.lifestyle, color: 'bg-purple-500 text-purple-600 border-purple-100' },
                  { name: 'Connectivity', score: property.neighbourhood.connectivity, color: 'bg-amber-500 text-amber-600 border-amber-100' }
                ].map((score, i) => (
                  <div key={i} className={`p-3 bg-slate-50 border rounded-2xl ${score.color}`}>
                    <span className="block text-[9px] text-slate-400 font-semibold uppercase">{score.name}</span>
                    <span className="text-base font-extrabold mt-1 block">{score.score} / 5</span>
                  </div>
                ))}
              </div>

              {/* Places List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {property.neighbourhood.places.map((place, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🏫</span>
                      <div className="text-[11px]">
                        <span className="font-bold text-slate-800 block leading-tight">{place.name}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold">{place.type}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visit Booking Form Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-6 sticky top-20">
              
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Listing Representative</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 flex items-center justify-center rounded-xl font-bold uppercase shadow-sm">
                    {property.ownerName.substring(0,2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{property.ownerName}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{property.ownerType} Listing</p>
                  </div>
                </div>
              </div>

              {!showBookingBox ? (
                /* Primary Actions */
                <div className="space-y-2">
                  <button
                    onClick={() => setShowBookingBox(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Property Visit
                  </button>
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    Contact {property.ownerType}
                  </a>
                </div>
              ) : (
                /* Interactive Booking Form */
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  
                  {bookingSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 text-emerald-800 animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                      <div>
                        <h4 className="font-bold text-xs">Visit Scheduled Successfully!</h4>
                        <p className="text-[9px] text-emerald-600 mt-1">
                          Visit booked for **{selectedDate}** at **{selectedTime}**. Details added to your Dashboard.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingConfirm} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-xs text-slate-700">Select Date & Time</h4>
                        <button 
                          type="button" 
                          onClick={() => setShowBookingBox(false)}
                          className="text-[10px] text-slate-400 font-bold hover:underline"
                        >
                          Back
                        </button>
                      </div>

                      {/* Date Input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Preferred Date</label>
                        <input
                          type="date"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                        />
                      </div>

                      {/* Time Slots Grid */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Available Slots</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                                selectedTime === time
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white py-2.5 rounded-xl font-bold text-xs transition-all shadow-md"
                      >
                        Confirm Visit Booking
                      </button>
                    </form>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Verification modal overlay */}
      <VerificationModal 
        isOpen={isVerModalOpen} 
        onClose={() => setIsVerModalOpen(false)} 
        property={property} 
      />
    </div>
  );
}
