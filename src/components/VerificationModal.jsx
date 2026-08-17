import React from 'react';
import { X, CheckCircle, ShieldCheck, Clock, AlertTriangle, UserCheck, MapPin, Image, ClipboardCheck, CopyCheck, Smartphone } from 'lucide-react';

export default function VerificationModal({ isOpen, onClose, property }) {
  if (!isOpen || !property) return null;

  const getStatusDetails = () => {
    switch (property.verifiedStatus) {
      case 'Verified':
        return {
          icon: ShieldCheck,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          title: 'HOME BUCKET Verified',
          desc: 'This property has successfully passed our 6-point verification audit.'
        };
      case 'Verification Pending':
        return {
          icon: Clock,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          title: 'Verification Pending',
          desc: 'Our agent verification team is currently auditing this listing.'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-rose-600',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          title: 'Unverified Listing',
          desc: 'This listing was uploaded recently and has not undergone our trust check yet.'
        };
    }
  };

  const status = getStatusDetails();
  const StatusIcon = status.icon;

  const points = [
    { label: "Owner Identity Check", desc: "Government IDs and registry records are verified for ownership.", icon: UserCheck },
    { label: "Physical Location Match", desc: "GPS tagging and coordinates matching the listed address.", icon: MapPin },
    { label: "Photo & Video Audit", desc: "Photos crosschecked with real-time site visits by inspectors.", icon: Image },
    { label: "Listing Specs Check", desc: "BHK count, square footage, and amenities list checked.", icon: ClipboardCheck },
    { label: "Anti-Duplicate Scan", desc: "Algorithms scan for matching duplicate broker listings.", icon: CopyCheck },
    { label: "Active Contact Verification", desc: "Phone numbers and availability of agent/owner verified.", icon: Smartphone },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className={`p-6 border-b border-slate-100 flex items-start gap-4 ${status.bgColor}`}>
          <div className={`p-3 rounded-xl bg-white shadow-sm ${status.color}`}>
            <StatusIcon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${status.color}`}>{status.title}</h3>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{status.desc}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-1.5 rounded-full border border-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Details */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span>6-Point Security Check</span>
            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
              {property.verifiedStatus === 'Verified' ? 'Passed' : property.verifiedStatus === 'Verification Pending' ? 'Auditing' : 'Skipped'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {points.map((pt, idx) => {
              const PtIcon = pt.icon;
              const isPassed = property.verifiedStatus === 'Verified';
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 p-3 rounded-xl border bg-white transition-all ${
                    isPassed ? 'border-emerald-100 hover:border-emerald-200' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isPassed ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                    <PtIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      {pt.label}
                      {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-normal">{pt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-700">Last Audited:</span>
            <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-800 font-medium">
              {property.verifiedStatus === 'Verified' ? property.lastVerified : 'N/A'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400">HOME BUCKET Verification Protocol v2.4</p>
        </div>
      </div>
    </div>
  );
}
