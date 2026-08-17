import React, { useState } from 'react';
import { DollarSign, Percent, Shield, CreditCard, Sparkles, Building, Info } from 'lucide-react';

export default function Calculator() {
  const [calcTab, setCalcTab] = useState('Rent'); // 'Rent' or 'Buy'

  // Rent Inputs
  const [rentPrice, setRentPrice] = useState(15000);
  const [rentMaintenance, setRentMaintenance] = useState(1500);
  const [rentParking, setRentParking] = useState(500);
  const [rentUtilities, setRentUtilities] = useState(2000);
  const [rentInternet, setRentInternet] = useState(700);

  // Buy Inputs
  const [buyPrice, setBuyPrice] = useState(7500000); // 75 Lakhs
  const [buyDownPayment, setBuyDownPayment] = useState(1500000); // 15 Lakhs
  const [buyInterestRate, setBuyInterestRate] = useState(8.5); // 8.5%
  const [buyTenure, setBuyTenure] = useState(20); // 20 years
  const [buyMaintenance, setBuyMaintenance] = useState(2500);
  const [buyTax, setBuyTax] = useState(1000);

  // Calculations for Rent
  const totalRentCost = rentPrice + rentMaintenance + rentParking + rentUtilities + rentInternet;

  // Calculations for Buy (EMI)
  // EMI Formula: [P x R x (1+R)^N]/[((1+R)^N)-1]
  const principal = buyPrice - buyDownPayment;
  const monthlyInterestRate = (buyInterestRate / 12) / 100;
  const numberOfMonths = buyTenure * 12;

  const emi = monthlyInterestRate > 0 
    ? Math.round((principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1))
    : Math.round(principal / numberOfMonths);

  const totalBuyMonthlyCost = emi + buyMaintenance + buyTax;

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
            📊 Phase 2: Budget Planning
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            What Will This Home Actually Cost You?
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Avoid post-move shocks! Calculate utility estimates, maintenance charges, and EMIs beforehand.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1 rounded-2xl flex max-w-xs w-full shadow-inner">
            <button
              onClick={() => setCalcTab('Rent')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                calcTab === 'Rent' 
                  ? 'bg-white text-blue-700 shadow' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Renting Costs
            </button>
            <button
              onClick={() => setCalcTab('Buy')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                calcTab === 'Buy' 
                  ? 'bg-white text-blue-700 shadow' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buying Costs (EMI)
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Sliders / Inputs Pane */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <h3 className="font-extrabold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-500" />
              Adjust Expense Parameters
            </h3>

            {calcTab === 'Rent' ? (
              <div className="space-y-4">
                
                {/* Rent Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Base Monthly Rent</span>
                    <span className="text-blue-600 text-sm font-extrabold">{formatCurrency(rentPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="500"
                    value={rentPrice}
                    onChange={(e) => setRentPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>₹5k</span>
                    <span>₹1 Lakh</span>
                  </div>
                </div>

                {/* Maintenance Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Society Maintenance / Amenities Fee</span>
                    <span className="text-slate-800 font-extrabold">{formatCurrency(rentMaintenance)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={rentMaintenance}
                    onChange={(e) => setRentMaintenance(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Parking Fee Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Monthly Parking Lease</span>
                    <span className="text-slate-800 font-extrabold">{formatCurrency(rentParking)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={rentParking}
                    onChange={(e) => setRentParking(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Utilities Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Electricity & Water (Est. Usage)</span>
                    <span className="text-slate-800 font-extrabold">{formatCurrency(rentUtilities)}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={rentUtilities}
                    onChange={(e) => setRentUtilities(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Internet Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>High-Speed Broadband Plan</span>
                    <span className="text-slate-800 font-extrabold">{formatCurrency(rentInternet)}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="3000"
                    step="50"
                    value={rentInternet}
                    onChange={(e) => setRentInternet(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Property Price */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Property Sale Price</span>
                    <span className="text-blue-600 text-sm font-extrabold">{formatCurrency(buyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000000" // 10L
                    max="50000000" // 5Cr
                    step="50000"
                    value={buyPrice}
                    onChange={(e) => {
                      const newPrice = parseInt(e.target.value);
                      setBuyPrice(newPrice);
                      // Auto scale down payment if it exceeds price
                      if (buyDownPayment >= newPrice) {
                        setBuyDownPayment(Math.round(newPrice * 0.2));
                      }
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>₹10 Lakhs</span>
                    <span>₹5 Crore</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Down Payment (Own Funds)</span>
                    <span className="text-slate-800 font-extrabold">{formatCurrency(buyDownPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max={buyPrice - 50000}
                    step="20000"
                    value={buyDownPayment}
                    onChange={(e) => setBuyDownPayment(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="text-[10px] text-blue-500 font-semibold">
                    Loan Principal: {formatCurrency(principal)} ({Math.round((principal / buyPrice) * 100)}% LTV)
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Annual Interest Rate (SBI / HDFC)</span>
                    <span className="text-slate-800 font-extrabold">{buyInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.1"
                    value={buyInterestRate}
                    onChange={(e) => setBuyInterestRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>5.0%</span>
                    <span>15.0%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Loan Duration</span>
                    <span className="text-slate-800 font-extrabold">{buyTenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={buyTenure}
                    onChange={(e) => setBuyTenure(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>5 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>

                {/* Monthly Maintenance Buy */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Monthly Maintenance (₹)</label>
                    <input
                      type="number"
                      value={buyMaintenance}
                      onChange={(e) => setBuyMaintenance(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Est. Property Tax/Month (₹)</label>
                    <input
                      type="number"
                      value={buyTax}
                      onChange={(e) => setBuyTax(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Results Summary Pane */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-700 to-indigo-800 p-6 sm:p-8 text-white flex flex-col justify-between">
            
            <div className="space-y-6">
              
              <div>
                <span className="text-blue-200 font-semibold text-[10px] uppercase tracking-widest block mb-1">
                  Estimated Monthly Outflow
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold">
                  {calcTab === 'Rent' ? formatCurrency(totalRentCost) : formatCurrency(totalBuyMonthlyCost)}
                  <span className="text-xs text-blue-200 font-medium block sm:inline sm:ml-1">/month</span>
                </h2>
              </div>

              {/* Breakdown Graph Bars */}
              <div className="space-y-3 pt-4 border-t border-blue-600">
                <span className="text-blue-200 font-semibold text-[10px] uppercase tracking-wider block">
                  Outflow Distribution
                </span>

                {calcTab === 'Rent' ? (
                  <div className="space-y-2 text-xs">
                    {/* Base Rent bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-blue-100">
                        <span>Base Rent ({Math.round((rentPrice / totalRentCost) * 100)}%)</span>
                        <span>{formatCurrency(rentPrice)}</span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-white h-full" style={{ width: `${(rentPrice / totalRentCost) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Maintenance bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-blue-100">
                        <span>Maintenance & Parking</span>
                        <span>{formatCurrency(rentMaintenance + rentParking)}</span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-indigo-300 h-full" style={{ width: `${((rentMaintenance + rentParking) / totalRentCost) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Utilities bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-blue-100">
                        <span>Utilities & Wi-Fi</span>
                        <span>{formatCurrency(rentUtilities + rentInternet)}</span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-blue-300 h-full" style={{ width: `${((rentUtilities + rentInternet) / totalRentCost) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    {/* EMI bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-blue-100">
                        <span>Home Loan EMI ({Math.round((emi / totalBuyMonthlyCost) * 100)}%)</span>
                        <span>{formatCurrency(emi)}</span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-white h-full" style={{ width: `${(emi / totalBuyMonthlyCost) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Maintenance/tax bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-blue-100">
                        <span>Taxes & Maintenance</span>
                        <span>{formatCurrency(buyMaintenance + buyTax)}</span>
                      </div>
                      <div className="w-full bg-blue-900 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-indigo-300 h-full" style={{ width: `${((buyMaintenance + buyTax) / totalBuyMonthlyCost) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Smart Advice Box */}
            <div className="bg-blue-900/50 p-4 border border-blue-600 rounded-2xl flex items-start gap-2.5 mt-6">
              <Sparkles className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white flex items-center gap-1">
                  HOME BUCKET Advice
                </h5>
                <p className="text-[10px] text-blue-100 mt-1 leading-normal">
                  {calcTab === 'Rent' 
                    ? "In Ahmedabad, security deposits are usually 2x of monthly rent. Prepare an additional upfront cash amount of " + formatCurrency(rentPrice * 2) + "."
                    : "Banks require a 20% downpayment on average. Your calculated principal loan of " + formatCurrency(principal) + " will require bank pre-approval."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
