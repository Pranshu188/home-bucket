import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { X, Mail, Lock, Phone, User, Home, Shield, Award } from 'lucide-react';

export default function LoginModal() {
  const { showLogin, setShowLogin, handleLogin } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Looking for Property');

  if (!showLogin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      name: isSignUp ? name : (email ? email.split('@')[0] : 'Siddharth Patel'),
      email: email || 'siddharth.patel@bba.edu',
      phone: phone || '+91 98795 98795',
      role: role
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
          <button 
            onClick={() => setShowLogin(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md mb-3 text-2xl font-bold">
            🏠
          </div>
          <h3 className="text-xl font-bold">Welcome to HOME BUCKET</h3>
          <p className="text-xs text-blue-100 mt-1">Your Next Home, All in One Place.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-slate-50/50">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${!isSignUp ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${isSignUp ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => setIsSignUp(true)}
            >
              Register
            </button>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 99999 99999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Your Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Buyer/Tenant', val: 'Looking for Property', icon: Home },
                { name: 'Owner', val: 'Property Owner', icon: Shield },
                { name: 'Broker', val: 'Agent', icon: Award }
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => setRole(r.val)}
                    className={`p-2 border rounded-lg flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      role === r.val
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium leading-tight">{r.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] mt-2"
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full absolute"></div>
            <span className="bg-white px-3 text-xs text-slate-400 relative z-10 font-medium">OR CONTINUE WITH</span>
          </div>

          <button
            type="button"
            onClick={() => {
              handleLogin({
                name: 'Siddharth Patel (Google)',
                email: 'siddharth.patel@bba.edu',
                role: role,
                phone: '+91 98795 98795'
              });
            }}
            className="w-full py-2 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.1C18.281 1.96 15.45 1 12.24 1c-6.077 0-11 4.923-11 11s4.923 11 11 11c6.34 0 10.564-4.436 10.564-10.749 0-.726-.077-1.282-.172-1.966H12.24z"
              />
            </svg>
            Google Account
          </button>
        </form>
      </div>
    </div>
  );
}
