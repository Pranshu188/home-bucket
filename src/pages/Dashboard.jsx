import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  User, Heart, Scale, Calendar, FileText, Briefcase, 
  MapPin, Clock, X, Upload, Download, Eye, CheckCircle2, UserCircle2 
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function Dashboard() {
  const { 
    currentUser, 
    favorites, 
    compareList, 
    visits, 
    cancelVisit, 
    allProperties,
    setActivePage,
    setSelectedPropertyId
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Saved', 'Visits', 'Documents', 'Services'
  const [uploadedDocs, setUploadedDocs] = useState([
    { name: 'Standard_Rental_Agreement_Ahmedabad.pdf', size: '1.2 MB', category: 'Rental Agreement', date: '14 August 2026' },
    { name: 'Identity_Proof_Aadhar.pdf', size: '840 KB', category: 'Identity Proof', date: '12 August 2026' },
    { name: 'Initial_Booking_Receipt.pdf', size: '320 KB', category: 'Payment Receipts', date: '12 August 2026' }
  ]);

  const [uploadProgress, setUploadProgress] = useState(null);

  const favoritedProperties = allProperties.filter(p => favorites.includes(p.id));

  const handleDocUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.files[0];
    if (!fileInput) return;

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadedDocs(docs => [
              {
                name: fileInput.name,
                size: `${(fileInput.size / 1024 / 1024).toFixed(2)} MB`,
                category: 'Identity Proof',
                date: '17 August 2026'
              },
              ...docs
            ]);
            setUploadProgress(null);
          }, 500);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const handleCardClick = (id) => {
    setSelectedPropertyId(id);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { label: 'Overview', icon: UserCircle2 },
    { label: 'Saved Properties', icon: Heart, count: favorites.length },
    { label: 'Scheduled Visits', icon: Calendar, count: visits.length },
    { label: 'Documents', icon: FileText },
    { label: 'Home Services', icon: Briefcase }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Side Navigation Sidebar */}
        <div className="md:col-span-1 space-y-4">
          
          {/* User profile Summary card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold uppercase shadow-md mx-auto">
              {currentUser ? currentUser.name.substring(0, 2) : 'SP'}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">{currentUser?.name || 'Siddharth Patel'}</h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">{currentUser?.role || 'Buyer'}</p>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {currentUser?.email || 'siddharth@example.com'}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-sm space-y-1">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.label || 
                (item.label === 'Saved Properties' && activeTab === 'Saved') || 
                (item.label === 'Scheduled Visits' && activeTab === 'Visits');

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.label === 'Saved Properties') setActiveTab('Saved');
                    else if (item.label === 'Scheduled Visits') setActiveTab('Visits');
                    else setActiveTab(item.label);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="bg-blue-600 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Content Pane */}
        <div className="md:col-span-3 space-y-6">
          
          {/* TAB OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Statistics block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Saved Houses', val: favorites.length, icon: Heart, color: 'text-red-500 bg-red-50' },
                  { label: 'visits Booked', val: visits.length, icon: Calendar, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Compared', val: compareList.length, icon: Scale, color: 'text-indigo-600 bg-indigo-50' },
                  { label: 'Documents', val: uploadedDocs.length, icon: FileText, color: 'text-purple-600 bg-purple-50' }
                ].map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${stat.color}`}>
                        <StatIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-semibold uppercase">{stat.label}</span>
                        <span className="text-lg font-bold text-slate-800">{stat.val}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Visit Details */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  📅 Upcoming Visit Schedule
                </h3>

                {visits.length > 0 ? (
                  <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex gap-3">
                      <img 
                        src={visits[0].image} 
                        alt={visits[0].propertyName} 
                        className="w-16 h-16 rounded-xl object-cover border border-blue-200"
                      />
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-800 hover:text-blue-700 cursor-pointer" onClick={() => handleCardClick(visits[0].propertyId)}>
                          {visits[0].propertyName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span>{visits[0].location}, Ahmedabad</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                          <span>Date: {visits[0].date}</span>
                          <span>Time: {visits[0].time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-slate-400 block font-semibold">Contact Person</span>
                        <span className="text-xs text-slate-700 font-bold">{visits[0].contactPerson}</span>
                      </div>
                      <button
                        onClick={() => cancelVisit(visits[0].id)}
                        className="w-full sm:w-auto bg-white hover:bg-red-50 text-slate-500 hover:text-red-500 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No scheduled property visits. Start booking visits from details pages!
                  </div>
                )}
              </div>

              {/* Saved properties mini grid */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  ❤️ Recently Saved
                </h3>
                {favoritedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoritedProperties.slice(0, 2).map(p => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    You haven't saved any listings yet.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB SAVED */}
          {activeTab === 'Saved' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider">
                ❤️ Saved Properties ({favoritedProperties.length})
              </h3>
              {favoritedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {favoritedProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow text-center text-slate-400 text-xs">
                  No saved properties found.
                </div>
              )}
            </div>
          )}

          {/* TAB VISITS */}
          {activeTab === 'Visits' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider">
                📅 Scheduled Visits ({visits.length})
              </h3>
              {visits.length > 0 ? (
                <div className="space-y-4">
                  {visits.map(visit => (
                    <div key={visit.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex gap-3">
                        <img 
                          src={visit.image} 
                          alt={visit.propertyName} 
                          className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 hover:text-blue-700 cursor-pointer" onClick={() => handleCardClick(visit.propertyId)}>
                            {visit.propertyName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{visit.location}, Ahmedabad</span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold mt-1.5 bg-slate-100 px-2 py-0.5 rounded-full w-max">
                            <span>{visit.date}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>{visit.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 block font-semibold">Representative</span>
                          <span className="text-xs text-slate-700 font-bold">{visit.contactPerson}</span>
                        </div>
                        <button
                          onClick={() => cancelVisit(visit.id)}
                          className="text-slate-400 hover:text-red-500 p-2 hover:bg-slate-50 rounded-lg transition-all"
                          title="Cancel Visit"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow text-center text-slate-400 text-xs">
                  No visits scheduled.
                </div>
              )}
            </div>
          )}

          {/* TAB DOCUMENTS */}
          {activeTab === 'Documents' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
                  📄 Digital Documents
                </h3>

                {/* Upload Form */}
                <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 active:scale-95">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Document
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleDocUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>

              {/* Progress bar mock */}
              {uploadProgress !== null && (
                <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm space-y-2">
                  <div className="flex justify-between text-xs font-bold text-blue-700">
                    <span>Uploading your file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}

              {/* Document List Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uploadedDocs.map((doc, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-3 justify-between">
                    <div className="flex gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="bg-slate-100 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1 mt-1">
                          {doc.name}
                        </h4>
                        <div className="text-[10px] text-slate-400 font-semibold">
                          {doc.size} • Uploaded {doc.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-center">
                      <button className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all" title="View PDF">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 transition-all" title="Download">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB SERVICES */}
          {activeTab === 'Home Services' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 uppercase tracking-wider">
                💼 Active Move-In Services
              </h3>

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold">SparkleClean Deep Cleaning</span> request successfully verified. A service manager will visit you on **23 August 2026 at 11:00 AM**.
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-500">
                  <span>Need to add more services?</span>
                  <button
                    onClick={() => setActivePage('services')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Browse Services Marketplace →
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
