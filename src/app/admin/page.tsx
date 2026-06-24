'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { HOTEL_BRAND } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    await new Promise(r => setTimeout(r, 1400));

    const validEmail = email.toLowerCase() === 'admin@skylighthotel.com';
    const validPassword = password === 'demo2026';

    if (validEmail && validPassword) {
      router.push('/admin/dashboard');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(180,151,90,0.8) 40px, rgba(180,151,90,0.8) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(180,151,90,0.8) 40px, rgba(180,151,90,0.8) 41px)`
        }}
      />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md px-6 relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-accent/60 font-bold mb-3">
            Hotel Management System
          </p>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">
            {HOTEL_BRAND.name.split(' ')[0]}
          </h1>
          <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mt-1">
            Property Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-lg p-10 backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@skylighthotel.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  className="w-full bg-transparent border-b border-white/15 focus:border-accent py-3 text-white placeholder:text-white/15 focus:outline-none transition-colors text-sm font-serif"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                  Secure Passphrase
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setStatus('idle'); }}
                    className="w-full bg-transparent border-b border-white/15 focus:border-accent py-3 text-white placeholder:text-white/20 focus:outline-none transition-colors text-sm pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] uppercase tracking-wider font-bold text-red-400 flex items-center gap-2"
              >
                <AlertCircle size={12} /> Invalid credentials. Please verify and retry.
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-accent text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 rounded-sm"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Authenticating...</span>
              ) : (
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Access Dashboard</span>
              )}
            </button>

            {/* Demo credentials hint */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <p className="text-[9px] uppercase tracking-widest text-white/20 text-center font-bold">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-[8px] text-white/20 uppercase tracking-widest">Email</p>
                  <button
                    type="button"
                    onClick={() => setEmail('admin@skylighthotel.com')}
                    className="text-[10px] font-mono text-accent/60 hover:text-accent transition-colors cursor-pointer"
                  >
                    admin@skylighthotel.com
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-white/20 uppercase tracking-widest">Password</p>
                  <button
                    type="button"
                    onClick={() => setPassword('demo2026')}
                    className="text-[10px] font-mono text-accent/60 hover:text-accent transition-colors cursor-pointer"
                  >
                    demo2026
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-[8px] uppercase tracking-widest text-white/15 mt-8 font-bold">
          Powered by Melhek Technologies · Property Management Suite v3.2
        </p>
      </motion.div>
    </div>
  );
}
