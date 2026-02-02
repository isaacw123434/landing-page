import React, { useState, useRef } from 'react';
import { saveEmail } from "./firebase";
import { 
  MapPin, 
  ArrowRight, 
  Briefcase, 
  Train, 
  Car, 
  Wifi, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Zap,
  MousePointer,
  Layout,
  Clock,
  Bus,
  Footprints,
  X,
  Lock,
  Navigation,
  Map as MapIcon,
  ChevronDown,
  ChevronUp,
  Bike
} from 'lucide-react';

const App = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isWorkMode, setIsWorkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const resultsRef = useRef(null);

  const [email, setEmail] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveEmail(email);
      alert('Thank you for subscribing!');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('There was an error subscribing. Please try again.');
      return;
    }

    setShowModal(false);
    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8f6] font-sans text-[#0d1c12] relative">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
          .font-display { font-family: 'Manrope', sans-serif; }
        `}
      </style>
      
      {/* Private Beta Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#102216]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200 font-display">
            <div className="bg-[#0df259] p-6 text-[#0d1c12] relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#0d1c12]/70 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-12 h-12 bg-white/40 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                <Lock size={24} className="text-[#0d1c12]" />
              </div>
              <h3 className="text-xl font-bold">Private Beta Access</h3>
              <p className="text-[#0d1c12]/80 text-sm mt-1 font-medium">
                We are currently limiting route calculations to prevent server overload.
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 text-sm">
                Enter your email to unlock the <strong>Leeds to Loughborough</strong> demo report and join the waitlist for your custom route.
              </p>
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f5f8f6] border border-gray-200 rounded-lg px-4 py-3 text-[#0d1c12] focus:outline-none focus:ring-2 focus:ring-[#0df259] font-medium placeholder:text-gray-400"
                />
                <button type="submit" className="w-full bg-[#0d1c12] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  View Demo Report <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#f5f8f6]/90 backdrop-blur-md border-b border-[#e7f4eb] sticky top-0 z-50 font-display">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-[#0df259] flex items-center justify-center">
            <MapIcon size={28} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#0d1c12]">Commute Architect</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button className="text-sm font-medium text-[#0d1c12] hover:text-[#0df259] transition-colors">How it works</button>
          <button className="bg-[#0df259]/10 hover:bg-[#0df259]/20 text-[#0d1c12] px-4 py-2 rounded-lg text-sm font-bold transition-colors">
             Sign In
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 py-12 lg:px-40 bg-cover bg-center bg-no-repeat font-display" 
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(245, 248, 246, 0.85) 0%, rgba(245, 248, 246, 0.4) 50%, rgba(245, 248, 246, 1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhOvrZQfwunAKURYxaZaqFXy20_kJyYoD_2dy535SBXelWTKkfeY_UisG63mVBhc3MnTHS2u4gXLjSLP5JSlm2vPOHF_wi7vWmb-9Tya3m3HxyggoyVg0XtKdEJsdnV9JS-3WmJtp4rjz3KpFxdnlW7LgvgHe0rXcvmmS7Q_toKQt9N2iWeDxbqSobpolTROvK7DSH0_hisJmikoKPlukSGRacDIArIOw8MZHhsWxYlqkHoFM6fzA9-o3BxA7FU5k4YeCth2a2nVw")'
        }}
      >
        <div className="flex flex-col items-center max-w-[960px] w-full gap-8 z-10">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#0d1c12]">
              Stop guessing how to get to work.
            </h1>
            <p className="text-lg md:text-xl text-[#0d1c12]/70 font-medium">
              The first multi-modal router that values your time as much as your wallet.
            </p>
          </div>
          
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl shadow-[#0df259]/10 border border-[#e7f4eb] p-2 md:p-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 relative">
                <div className="flex items-center bg-[#f5f8f6] rounded-lg px-3 py-3 border border-[#cee8d7] focus-within:border-[#0df259] transition-colors group">
                  <MapPin className="text-[#0df259] mr-3" size={20} />
                  <input 
                    className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 text-[#0d1c12] placeholder:text-gray-400 outline-none font-medium" 
                    placeholder="Start location (e.g. St Chads View)" 
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                </div>
                <div className="absolute left-5 top-10 bottom-10 w-0.5 border-l border-dashed border-gray-300 z-0 hidden md:block"></div>
                <div className="flex items-center bg-[#f5f8f6] rounded-lg px-3 py-3 border border-[#cee8d7] focus-within:border-[#0df259] transition-colors relative z-10 group">
                  <MapPin className="text-red-500 mr-3" size={20} />
                  <input 
                    className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 text-[#0d1c12] placeholder:text-gray-400 outline-none font-medium" 
                    placeholder="End destination (e.g. East Leake)" 
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-2">
                <div className="flex items-center gap-1 bg-[#f5f8f6] rounded-lg p-1 border border-[#cee8d7] w-full md:w-auto">
                  <button 
                    type="button"
                    onClick={() => setIsWorkMode(true)}
                    className={`flex-1 md:flex-none px-4 py-1.5 rounded text-xs font-bold shadow-sm transition-all ${isWorkMode ? 'bg-white text-[#0d1c12]' : 'bg-transparent text-gray-500 hover:text-[#0d1c12]'}`}
                  >
                    Productivity
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsWorkMode(false)}
                    className={`flex-1 md:flex-none px-4 py-1.5 rounded text-xs font-bold shadow-sm transition-all ${!isWorkMode ? 'bg-white text-[#0d1c12]' : 'bg-transparent text-gray-500 hover:text-[#0d1c12]'}`}
                  >
                    Lowest Cost
                  </button>
                </div>
                
                <button 
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0df259] hover:bg-[#0be050] text-[#0d1c12] px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#0df259]/20"
                >
                  <Navigation size={18} fill="currentColor" className="opacity-80"/>
                  Calculate Route
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={resultsRef} className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20 font-display">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wide mb-4 border border-amber-200">
            Demo Report
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d1c12] mb-4">
            Three ways to beat the traffic.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
             Here is the breakdown for <span className="font-semibold text-indigo-600">Leeds to Loughborough</span> based on your constraints (No Cycling).
          </p>
        </div>

        {/* The Timeline Visualization Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#e7f4eb]">
          <div className="bg-[#f5f8f6] px-6 py-4 border-b border-[#e7f4eb] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <div className="h-3 w-3 rounded-full bg-[#0df259]"></div>
            </div>
            <div className="text-xs font-mono text-gray-400">ANALYSIS_ID: #8821X</div>
          </div>

          <div className="p-6 md:p-10 space-y-16">
            
            {/* OPTION 1: THE FASTEST (Direct Drive) */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                <div>
                   <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Option 1: Fastest Route</div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                    <Car size={20} className="text-red-500"/> 
                    Direct Drive
                  </h3>
                </div>
                <div className="text-left md:text-right bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                  <div className="text-xl font-bold text-slate-900">£39.15</div>
                  <div className="text-xs text-red-500 font-bold">Productive Time: 0 mins</div>
                </div>
              </div>

              <div className="relative">
                <div className="flex h-12 w-full rounded-lg overflow-hidden ring-1 ring-red-100 shadow-sm bg-white">
                  <div className="w-full bg-red-50 flex items-center justify-center relative border-l-4 border-red-500">
                    <Car size={16} className="text-red-600 mr-2"/>
                    <span className="text-sm font-bold text-red-900">1h 50m Direct Drive</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] md:text-xs text-slate-400 px-1">
                   <div className="w-full text-center">87 Miles @ 45p/mile (HMRC)</div>
                </div>
              </div>
            </div>

            {/* OPTION 2: THE CHEAPEST (Bus + Train + Bus) */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                <div>
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Option 2: Cheapest Route</div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                    <Bus size={20} className="text-emerald-500"/> 
                    Public Transport Only
                  </h3>
                </div>
                <div className="text-left md:text-right bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                  <div className="text-xl font-bold text-slate-900">£30.70</div>
                  <div className="text-xs text-slate-500 font-medium">~2h 25m Total</div>
                </div>
              </div>

              <div className="relative">
                <div className="flex h-12 w-full rounded-lg overflow-hidden ring-1 ring-slate-200 shadow-sm bg-slate-50">
                  <div className="w-[18%] bg-emerald-100 border-r border-white flex items-center justify-center group relative cursor-help">
                    <Bus size={14} className="text-emerald-700"/>
                    <span className="hidden md:block ml-1 text-xs font-bold text-emerald-800">£2.00</span>
                  </div>
                  <div className="w-[64%] bg-slate-200 border-r border-white flex items-center justify-center relative">
                    <Train size={14} className="text-slate-500 mr-2"/>
                    <span className="text-xs font-bold text-slate-600">Train £25.70</span>
                  </div>
                  <div className="w-[18%] bg-emerald-100 flex items-center justify-center cursor-help">
                    <Bus size={14} className="text-emerald-700"/>
                    <span className="hidden md:block ml-1 text-xs font-bold text-emerald-800">£3.00</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] md:text-xs text-slate-400 px-1">
                   <div className="w-[18%] text-center leading-tight">Bus 24<br/>(23m)</div>
                   <div className="w-[64%] text-center">Leeds Stn ➔ Loughborough<br/>(1h 42m)</div>
                   <div className="w-[18%] text-center leading-tight">Bus 1<br/>(14m)</div>
                </div>
              </div>
            </div>

            {/* OPTION 3: HYBRID (Uber + Train + Bus) */}
            <div className="relative pt-6 pb-2 -mx-4 px-4 md:-mx-6 md:px-6 bg-[#0df259]/5 rounded-2xl border border-[#0df259]/20">
              <div className="absolute top-0 left-6 transform -translate-y-1/2">
                 <div className="bg-[#0d1c12] text-[#0df259] text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                   <Zap size={12} fill="currentColor"/> Architect's Pick: "The Smart Train"
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Option 3: Hybrid Route</div>
                    <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-900">
                      <Train size={20} className="text-indigo-600"/> 
                      Uber Start / Bus End
                    </h3>
                  </div>
                  <div className="text-left md:text-right bg-white px-3 py-2 rounded-lg border border-[#0df259]/30 shadow-sm">
                    <div className="text-xl font-bold text-indigo-700">£37.67</div>
                    <div className="text-xs text-green-600 font-bold flex items-center md:justify-end gap-1">
                      <CheckCircle size={12} /> Balance of Speed & Cost
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex h-14 w-full rounded-lg overflow-hidden ring-1 ring-indigo-200 shadow-md bg-white">
                    <div className="w-[15%] bg-slate-800 text-white flex flex-col items-center justify-center border-r border-slate-700">
                      <span className="text-[9px] font-bold tracking-wider">UBER</span>
                      <span className="text-[10px] text-slate-300">£8.97</span>
                    </div>

                    <div className="w-[70%] bg-indigo-100 flex flex-col items-center justify-center relative border-r border-white">
                       <div className="flex items-center gap-2 mb-0.5">
                          <div className="flex -space-x-1">
                            <div className="w-2 h-2 rounded-full bg-[#660f21] ring-1 ring-white"></div> 
                            <div className="w-2 h-2 rounded-full bg-[#4c265b] ring-1 ring-white"></div>
                          </div>
                          <span className="text-[10px] md:text-xs font-bold text-indigo-900 uppercase tracking-wide">Train</span>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] md:text-xs text-indigo-700 font-medium">
                         <Wifi size={10} /> 
                         <span className="hidden md:inline">Wi-Fi + Table</span>
                       </div>
                    </div>

                    <div className="w-[15%] bg-emerald-100 flex flex-col items-center justify-center">
                      <span className="text-[9px] text-emerald-800 font-bold tracking-wider">BUS 1</span>
                      <span className="text-[10px] text-emerald-600 font-bold">£3.00</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] md:text-xs text-indigo-400/80 px-1 font-medium">
                     <div className="w-[15%] text-center leading-tight">Door to Stn<br/>(14m)</div>
                     <div className="w-[70%] text-center">1h 42m Working Time</div>
                     <div className="w-[15%] text-center leading-tight">Station to Dest.<br/>(14m)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CALCULATED DATA DROPDOWN */}
          <div className="border-t border-[#e7f4eb]">
            <button 
              onClick={() => setShowAllRoutes(!showAllRoutes)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <span>View All 12 Calculated Combinations</span>
              {showAllRoutes ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            
            {showAllRoutes && (
               <div className="bg-gray-50 px-6 pb-6 text-sm text-gray-600 animate-in slide-in-from-top-2">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">Segment 1: St Chads View → Leeds Stn</h4>
                       <ul className="space-y-2 font-mono text-xs">
                          <li className="flex justify-between"><span>• Cycle (3.2 mi)</span> <span>17 min | £0.00</span></li>
                          <li className="flex justify-between text-red-500"><span>• Drive to Station (4.2 mi)</span> <span>15 min | 45p/mi</span></li>
                          <li className="flex justify-between text-red-500 pl-4"><span>+ Parking (24h)</span> <span>£23.00</span></li>
                         className="flex justify-between"><span>• Bus (Line 24)</span> <span>23 min | £2.00</span></li>
                          <li className="flex justify-between font-bold bg-indigo-50 px-1"><span>• Uber Direct</span> <span>14 min | £8.97</span></li>
                          <li className="flex justify-between"><span>• Uber (5m) + Train (10m)</span> <span>15 min | £9.32</span></li>
                       </ul>
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">Segment 3: Loughborough → East Leake</h4>
                       <ul className="space-y-2 font-mono text-xs">
                          <li className="flex justify-between font-bold bg-emerald-50 px-1"><span>• Walk + Bus (Line 1)</span> <span>14 min | £3.00</span></li>
                          <li className="flex justify-between"><span>• Uber (4.5 mi)</span> <span>10 min | £14.89</span></li>
                          <li className="flex justify-between"><span>• Cycle (4.5 mi)</span> <span>24 min | £0.00</span></li>
                       </ul>
                    </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Long Haul: Leeds → Loughborough</h4>
                    <ul className="space-y-1 font-mono text-xs">
                        <li className="flex justify-between"><span>• Train (CrossCountry / EMR)</span> <span>1h 42m | £25.70</span></li>
                        <li className="flex justify-between text-red-500"><span>• Direct Drive (87 mi)</span> <span>1h 50m | £39.15</span></li>
                    </ul>
                 </div>
               </div>
            )}
          </div>
          
          <div className="bg-[#f5f8f6] p-6 border-t border-[#e7f4eb] text-center">
            <p className="text-gray-600 mb-4 text-sm font-medium">
              Want this report for your specific commute?
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="you@company.com" 
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0df259]"
              />
              <button className="bg-[#0d1c12] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                Get My Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Logic Features Section */}
      <section className="py-20 bg-white font-display">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0d1c12]">How we find the routes Google misses.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 rounded-2xl bg-[#f5f8f6] border border-[#cee8d7] hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-[#cee8d7] rounded-xl flex items-center justify-center text-[#0d1c12] mb-6 group-hover:bg-[#0df259] transition-colors">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1c12] mb-3">The "Hub" Stitching</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We don't just say 'Drive' or 'Train.' We find the sweet spot: Drive to the Hub, then take the train. Avoid city centre parking fees and motorway traffic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f5f8f6] border border-[#cee8d7] hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-[#cee8d7] rounded-xl flex items-center justify-center text-[#0d1c12] mb-6 group-hover:bg-[#0df259] transition-colors">
                <Car size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1c12] mb-3">Parking vs. Uber Maths</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Is parking at the station £23? An Uber might be £8.97. We check the live prices so you don't have to guess.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f5f8f6] border border-[#cee8d7] hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-[#cee8d7] rounded-xl flex items-center justify-center text-[#0d1c12] mb-6 group-hover:bg-[#0df259] transition-colors">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1c12] mb-3">The Productivity Engine</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Turn travel time into desk time. We highlight routes with Wi-Fi and tables so you arrive with your work already done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Speeder Section */}
      <section className="py-20 bg-[#0d1c12] text-white font-display">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Stop Tab-Switching.</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <XCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">The Old Way</h4>
                    <p className="text-slate-400 text-sm">Check Google Maps → Check Trainline → Check Parking prices → Guess traffic.</p>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-slate-700 ml-4"></div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0df259] flex items-center justify-center shrink-0 text-[#0d1c12]">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#0df259]">The Architect Way</h4>
                    <p className="text-gray-300 mb-3 text-sm">One Search. Three Perfect Options.</p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2"><Zap size={14} className="text-[#0df259]"/> The Fastest Route</li>
                      <li className="flex items-center gap-2"><TrendingUp size={14} className="text-[#0df259]"/> The Cheapest Route</li>
                      <li className="flex items-center gap-2"><Briefcase size={14} className="text-[#0df259]"/> The Hybrid Productivity Route</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a2e22] p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <MousePointer size={100} />
               </div>
               <h3 className="text-xl font-bold mb-4">Deep-link to book</h3>
               <p className="text-gray-400 mb-6 text-sm">
                 Found the perfect route? We deep-link you directly to Trainline or Uber with the destination pre-filled.
               </p>
               <div className="flex gap-4">
                 <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg text-sm font-medium transition-colors">Book Train</button>
                 <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg text-sm font-medium transition-colors">Order Uber</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#f5f8f6] border-t border-[#e7f4eb] font-display">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0d1c12] mb-4">Plan a smarter workday.</h2>
          <p className="text-gray-600 mb-8">
            Join the Beta to start saving hours and money on your business commutes.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="flex-1 bg-white border border-[#cee8d7] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0df259] text-[#0d1c12]"
            />
            <button className="bg-[#0df259] text-[#0d1c12] font-bold py-3 px-6 rounded-xl hover:bg-[#0be050] transition-colors shadow-lg shadow-[#0df259]/20">
              Get Early Access
            </button>
          </form>
          <div className="mt-12 text-sm text-gray-400">
            © 2024 Commute Architect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
                       </ul>
                    </div>
                 </div>
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
