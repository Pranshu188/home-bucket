import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, ShieldAlert, FileText, LayoutGrid, DollarSign, Bed, Minimize, Info } from 'lucide-react';

export default function SellProperty() {
  const { listNewProperty, currentUser, setShowLogin, setActivePage } = useContext(AppContext);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [propType, setPropType] = useState('Apartment');
  const [purpose, setPurpose] = useState('Rent');
  const [location, setLocation] = useState('Satellite');
  const [price, setPrice] = useState('');
  const [bhk, setBhk] = useState('2');
  const [area, setArea] = useState('');
  const [furnishing, setFurnishing] = useState('Semi-Furnished');
  const [amenitiesText, setAmenitiesText] = useState('Gated Community, Security, Lift, Parking');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const ahmedabadAreas = [
    'Satellite', 'Prahlad Nagar', 'Bopal', 'Thaltej', 'Vastrapur',
    'Chandkheda', 'SG Highway', 'Navrangpura', 'Gota', 'Maninagar',
    'South Bopal', 'Shela'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLogin(true);
      return;
    }

    const amenities = amenitiesText.split(',').map(a => a.trim()).filter(Boolean);

    const listed = listNewProperty({
      name: `${bhk} BHK ${propType} in ${location}`,
      type: propType,
      purpose,
      price: parseInt(price),
      bhk: parseInt(bhk),
      area: parseInt(area),
      bathrooms: parseInt(bhk) === 1 ? 1 : parseInt(bhk) - 1 || 1,
      location,
      furnishing,
      amenities,
      description: desc || `Beautiful ${bhk} BHK ${propType} located in ${location}, Ahmedabad. Features convenient amenities and high accessibility.`,
      image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      parking: "Yes",
      balcony: "Yes",
      lift: "Yes",
      security: "Yes",
      distanceToCollege: 2.0,
      distanceToWork: 3.5
    });

    setSuccess(true);
  };

  const handleListAnother = () => {
    setSuccess(false);
    setPrice('');
    setArea('');
    setDesc('');
    setImage('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Page */}
        {success ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full">
              <CheckCircle className="w-16 h-16" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-800">Submitted for Verification!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                Your property listing has been successfully saved in our database. The HOME BUCKET inspector team has been notified.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto flex items-start gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-amber-800">Verification Pending (Next Steps)</h4>
                <p className="text-[10px] text-amber-700 mt-0.5 leading-normal">
                  Our ground team will call you within 24 hours to schedule a quick 15-minute verification visit of the property.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={() => { setActivePage('dashboard'); window.scrollTo({top:0, behavior:'smooth'}); }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all shadow-md"
              >
                Track in Dashboard
              </button>
              <button
                onClick={handleListAnother}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-all"
              >
                List Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            
            {/* Header banner */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-extrabold">Sell or Rent Your Property Faster</h2>
              <p className="text-blue-100 text-xs mt-1">
                Provide accurate details to start our 6-Point Trust Verification process.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              {/* Owner Info Block */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  Seller Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Owner Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99999 99999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details Block */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <LayoutGrid className="w-4 h-4 text-blue-500" />
                  Property Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Property Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Property Type</label>
                    <select
                      value={propType}
                      onChange={(e) => setPropType(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Independent House</option>
                      <option>PG</option>
                      <option>Studio</option>
                    </select>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Listing Purpose</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Rent">For Rent</option>
                      <option value="Buy">For Sale (Buy)</option>
                      <option value="PG">Hostel / PG</option>
                    </select>
                  </div>

                  {/* Location Area */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Ahmedabad Locality</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {ahmedabadAreas.map((areaOption) => (
                        <option key={areaOption} value={areaOption}>{areaOption}</option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">
                      {purpose === 'Rent' || purpose === 'PG' ? 'Monthly Rent (₹)' : 'Sale Price (₹)'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">₹</div>
                      <input
                        type="number"
                        required
                        placeholder={purpose === 'Rent' || purpose === 'PG' ? 'e.g. 15000' : 'e.g. 8500000'}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-7 pr-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* BHK */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">BHK Configuration</label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>

                  {/* Area */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Super Area (sq ft)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1200"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Furnishing */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Furnishing State</label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Fully Furnished</option>
                      <option>Semi-Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>

                  {/* Image URL Mock */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Demo Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="Leave blank for automatic placeholder"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Amenities (comma-separated)</label>
                  <input
                    type="text"
                    value={amenitiesText}
                    onChange={(e) => setAmenitiesText(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Describe your property (furnishing items, balconies, parking details...)"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Warnings / Terms */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] text-slate-500 flex gap-2">
                <span>⚠️</span>
                <p>
                  By submitting, you agree to allow HOME BUCKET agents to perform verification checks on the property. Fake listings will be blacklisted.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-[0.99]"
              >
                Submit Listing for Verification
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
