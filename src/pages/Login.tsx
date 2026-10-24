import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/virtual-watch.png';
import citySkyline from '../assets/city_skyline.png';

export default function Login() {
  const [email, setEmail] = useState('ops@Bulaba-care.co.uk');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc]">
      {/* Left Panel */}
      <div className="relative hidden w-[45%] flex-col justify-center overflow-hidden bg-gradient-to-b from-[#42A5E2] to-[#2972D0] p-12 lg:flex xl:p-24">
        {/* Background Skyline */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${citySkyline})` }}
        />
        
        <div className="relative z-10 flex flex-col h-full max-w-[500px]">
          <div className="mb-12 flex items-center gap-3">
            <img src={logo} alt="Virtual Watch Logo" className="h-10 brightness-0 invert" />
          </div>

          <div className="text-white space-y-4">
            <h2 className="text-xs font-bold tracking-[0.1em] uppercase opacity-90 mb-6">Welcome back</h2>
            <h1 className="text-4xl font-bold leading-tight md:text-[44px]">
              Pick up right where your team left off.
            </h1>
            <p className="text-[17px] opacity-90 mt-6 leading-relaxed font-medium">
              Rotas updated overnight, timesheets waiting for approval, compliance alerts that matter - your dashboard is exactly as you left it.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-[55%] lg:px-24 xl:px-32">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Sign in</h1>
            <p className="text-slate-500 font-medium">Access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-slate-200 px-5 py-[14px] text-[15px] focus:border-[#42A5E2] focus:outline-none focus:ring-1 focus:ring-[#42A5E2] transition-shadow placeholder:text-slate-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-600" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-[13px] font-semibold text-[#42A5E2] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-slate-200 pl-5 pr-12 py-[14px] text-[15px] tracking-widest focus:border-[#42A5E2] focus:outline-none focus:ring-1 focus:ring-[#42A5E2] transition-shadow placeholder:text-slate-400 placeholder:tracking-normal"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-[18px] w-[18px] rounded-[4px] border-slate-200 text-[#42A5E2] focus:ring-[#42A5E2]"
              />
              <label htmlFor="remember" className="text-[14px] font-medium text-slate-500">
                Remember me on this device
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-[#42A5E2] py-[14px] text-[15px] font-semibold text-white hover:bg-[#3492CE] focus:outline-none focus:ring-2 focus:ring-[#42A5E2] focus:ring-offset-2 transition-colors shadow-sm shadow-[#42A5E2]/30"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
