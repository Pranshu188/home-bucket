import React, { useState, useContext } from 'react';
import { mockServices } from '../data/services';
import { AppContext } from '../context/AppContext';
import { Star, MapPin, ShieldCheck, CheckCircle2, ChevronRight, Calendar, User, Phone } from 'lucide-react';

export default function Services() {
  const { currentUser, setShowLogin } = useContext(AppContext);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-08-23');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [bookingPhone, setBookingPhone] = useState(currentUser?.phone || '');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Packers & Movers', 'Cleaning', 'Electrician', 'Plumber', 'Painting', 'Furniture Rental', 'Internet Installation', 'Locksmith'];

  const filteredServices = activeCategory === 'All' 
    ? mockServices 
    : mockServices.filter(s => s.category === activeCategory);

  const handleBookNow = (service) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    setSelectedService(service);
    setBookingPhone(currentUser.phone || '');
  };

  const submitBooking = (e) => {
    e.preventDefault();
    // Simulate booking save
    setShowBookingSuccess(true);
    setTimeout(() => {
      setShowBookingSuccess(false);
      setSelectedService(null);
    }, 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
            🚚 Phase 3: Move-In Support
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Everything You Need After Finding Your Home
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Book trusted, verified local home service providers in Ahmedabad with guaranteed pricing.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 justify-center py-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header info */}
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {service.category}
                  </span>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{service.rating} ({service.reviews})</span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-extrabold text-base text-slate-800">{service.name}</h3>
                
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{service.description}</p>

                {/* Bullet Features */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Footer */}
              <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Starting From</span>
                  <span className="text-base font-extrabold text-slate-900">₹{service.startingPrice.toLocaleString('en-IN')}</span>
                </div>
                
                <button
                  onClick={() => handleBookNow(service)}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-1"
                >
                  Book Now
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form Dialog Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 relative animate-in fade-in zoom-in duration-200">
              
              {!showBookingSuccess ? (
                <form onSubmit={submitBooking} className="space-y-4">
                  <div className="text-center space-y-1.5 pb-2 border-b border-slate-100">
                    <span className="text-2xl">📦</span>
                    <h3 className="font-extrabold text-lg text-slate-900">Book {selectedService.name}</h3>
                    <p className="text-slate-500 text-xs">Verify your booking details below.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Preferred Time Slot</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white font-medium"
                    >
                      <option>09:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                      <option>06:00 PM</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 99999 99999"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Estimated Shifting Rate</span>
                    <span className="text-lg font-bold text-slate-800">₹{selectedService.startingPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">(Final quote given post-visit inspection)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-all shadow-md shadow-blue-500/10"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="font-extrabold text-xl text-slate-900">Service Booked!</h3>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">
                    Your request for **{selectedService.name}** has been registered. An inspector will contact you shortly.
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Added to your scheduled notifications.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
