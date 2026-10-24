import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTED

export default function AdminAuth() {
  const navigate = useNavigate(); // <-- INITIALIZED
  
  const [isLogin, setIsLogin] = useState(true);
  const [regStep, setRegStep] = useState('details');
  
  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);  

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [otp, setOtp] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API Login
    setTimeout(() => {
      setIsLoading(false);
      // If login is successful, redirect to dashboard
      navigate('/admin/dashboard'); 
    }, 1000);
  };

  const handleRequestOTP = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const SECRET_KEY = "AMU-Admin-2026"; 
    if (adminCode !== SECRET_KEY) {
      setError('Invalid Secret Admin Code. You are not authorized.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegStep('otp');
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Registration successful! Please login.');
      setRegStep('details');
      setIsLogin(true);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1000);
  };

  const handleForgotRequest = (e) => {
    e.preventDefault();
    if(!email) { setError('Please enter your email'); return; }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep(2);
    }, 1000);
  };

  const handleForgotVerifyOTP = (e) => {
    e.preventDefault();
    if(otp.length < 6) { setError('Enter valid OTP'); return; }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep(3);
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Password reset successfully! Please login.');
      setShowForgot(false);
      setForgotStep(1);
      setPassword('');
      setConfirmPassword('');
      setOtp(''); 
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1000);
  };

  const toggleAuthMode = (loginState) => {
    setIsLogin(loginState);
    setError('');
    setRegStep('details');
    setShowForgot(false);
    setForgotStep(1);
  };

  const flipVariants = {
    initial: (isLogin) => ({ rotateY: isLogin ? 0 : 180 }),
    animate: (isLogin) => ({
      rotateY: isLogin ? 0 : 180,
      transition: { type: 'spring', stiffness: 200, damping: 25 }
    }),
  };
 
  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3F]/40 transition-all text-sm";
  const btnClass = "mt-2 w-full flex items-center justify-center bg-[#006B3F] hover:bg-[#004D2D] text-white font-bold py-3.5 rounded-xl shadow-[0_5px_15px_rgba(0,107,63,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-4 sm:p-6 lg:p-8 [perspective:2000px]">
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#E6F2EC] rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E6F2EC] rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-[1000px] min-h-[650px] bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_rgba(0,45,27,0.15)] border border-white flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* LEFT SIDE: Image */}
        <div className="hidden md:block md:w-1/2 relative bg-[#004D2D]">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=1200" 
            alt="AMU Campus" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004D2D] via-[#004D2D]/40 to-transparent" />
          <div className="absolute bottom-12 left-10 right-10 text-white">
            <h3 className="text-3xl font-extrabold tracking-tight mb-2">AMU Student Portal</h3>
            <p className="text-white/80 text-sm leading-relaxed">Empowering students, building a better campus. Access the administrative dashboard.</p>
          </div>
        </div>

        {/* RIGHT SIDE: Forms */}
        <div className="w-full md:w-1/2 relative [perspective:2000px] p-4 sm:p-8 flex items-center justify-center">
          
          <motion.div
            custom={isLogin}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            className="relative w-full max-w-[400px] h-[600px] [transform-style:preserve-3d]"
          >
            
            {/*  FRONT FACE: LOGIN & FORGOT PASSWORD  */}
            <div 
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="bg-[#004D2D] p-6 text-center rounded-b-[2rem] shadow-md relative overflow-hidden shrink-0 z-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {showForgot ? 'Reset Password' : 'Admin Portal'}
                </h2>
                <p className="text-[#D4AF37] text-sm mt-1 font-medium">
                  {showForgot 
                    ? (forgotStep === 1 ? 'Enter email to receive OTP.' : forgotStep === 2 ? 'Enter the OTP sent to you.' : 'Create a new password.')
                    : 'Welcome back, please sign in.'}
                </p>
              </div>

              <div className="flex-1 p-8 relative overflow-y-auto">
                
                {error && <div className="absolute top-2 left-6 right-6 bg-red-50 text-red-500 text-xs p-2 rounded-lg text-center font-medium border border-red-100 z-20">{error}</div>}
                {successMsg && <div className="absolute top-2 left-6 right-6 bg-green-50 text-green-600 text-xs p-2 rounded-lg text-center font-medium border border-green-100 z-20">{successMsg}</div>}

                <AnimatePresence mode="wait">
                  
                  {showForgot ? (
                    <motion.div key="forgot-flow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="h-full flex flex-col justify-center">
                      
                      {forgotStep === 1 && (
                        <form onSubmit={handleForgotRequest} className="flex flex-col gap-5">
                          <div>
                            <label className="block text-[#292929] text-sm font-semibold mb-1.5">Email Address</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="admin@amu.ac.in" />
                          </div>
                          <button type="submit" disabled={isLoading} className={btnClass}>
                            {isLoading ? 'Sending...' : 'Send Reset OTP'}
                          </button>
                          <div className="text-center mt-2">
                            <button type="button" onClick={() => setShowForgot(false)} className="text-sm text-gray-500 hover:text-[#006B3F] font-medium">Back to Login</button>
                          </div>
                        </form>
                      )}

                      {forgotStep === 2 && (
                        <form onSubmit={handleForgotVerifyOTP} className="flex flex-col gap-5">
                          <div>
                            <label className="block text-center text-[#292929] text-sm font-semibold mb-2">Enter 6-digit OTP</label>
                            <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className={`${inputClass} text-center tracking-[0.5em] text-xl font-bold py-4`} placeholder="••••••" maxLength={6} />
                          </div>
                          <button type="submit" disabled={isLoading || otp.length < 6} className={btnClass}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                          </button>
                          <div className="text-center mt-2">
                            <button type="button" onClick={() => setForgotStep(1)} className="text-sm text-gray-500 hover:text-[#006B3F] font-medium">Change Email</button>
                          </div>
                        </form>
                      )}

                      {forgotStep === 3 && (
                        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                          <div>
                            <label className="block text-[#292929] text-sm font-semibold mb-1.5">New Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                          </div>
                          <div>
                            <label className="block text-[#292929] text-sm font-semibold mb-1.5">Confirm Password</label>
                            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} ${confirmPassword && password !== confirmPassword ? 'border-red-300 focus:ring-red-400/40' : ''}`} placeholder="••••••••" />
                          </div>
                          <button type="submit" disabled={isLoading} className={btnClass}>
                            {isLoading ? 'Updating...' : 'Reset Password'}
                          </button>
                        </form>
                      )}

                    </motion.div>
                  ) : (
                    
                    <motion.form key="login-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleLogin} className="h-full flex flex-col justify-center gap-5">
                      <div>
                        <label className="block text-[#292929] text-sm font-semibold mb-1.5">Email Address</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="admin@amu.ac.in" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-[#292929] text-sm font-semibold">Password</label>
                          <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-[#006B3F] font-medium hover:underline">Forgot?</button>
                        </div>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                      </div>
                      <button type="submit" disabled={isLoading} className={btnClass}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </button>
                      <div className="mt-auto text-center pt-4">
                        <p className="text-sm text-gray-500">Don't have an account?{' '}<button type="button" onClick={() => toggleAuthMode(false)} className="font-bold text-[#D4AF37] hover:text-[#b8952d] transition-colors">Register here</button></p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* BACK FACE: REGISTRATION FORM & OTP */}
            <div 
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="bg-[#004D2D] p-6 text-center rounded-b-[2rem] shadow-md relative overflow-hidden shrink-0 z-10">
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-2xl font-bold text-white tracking-tight">{regStep === 'details' ? 'Admin Registration' : 'Verify Email'}</h2>
                <p className="text-[#D4AF37] text-sm mt-1 font-medium">{regStep === 'details' ? 'Create your administrative account.' : `Enter the OTP sent to ${email}`}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 relative">
                {error && <div className="absolute top-2 left-6 right-6 bg-red-50 text-red-500 text-xs p-2 rounded-lg text-center font-medium border border-red-100 z-20">{error}</div>}

                <AnimatePresence mode="wait">
                  {regStep === 'details' ? (
                    <motion.form key="reg-details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleRequestOTP} className="flex flex-col gap-4 pt-4">
                      <div>
                        <label className="block text-[#292929] text-sm font-semibold mb-1.5">Full Name</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-[#292929] text-sm font-semibold mb-1.5">Email Address</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="admin@amu.ac.in" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#292929] text-sm font-semibold mb-1.5">Password</label>
                          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                        </div>
                        <div>
                          <label className="block text-[#292929] text-sm font-semibold mb-1.5">Confirm Pass</label>
                          <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${inputClass} ${confirmPassword && password !== confirmPassword ? 'border-red-300 focus:ring-red-400/40' : ''}`} placeholder="••••••••" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#292929] text-sm font-semibold mb-1.5">Secret Admin Code</label>
                        <input type="text" required value={adminCode} onChange={(e) => setAdminCode(e.target.value)} className={`${inputClass} font-mono`} placeholder="X-XXXX-XXXX" />
                      </div>
                      <button type="submit" disabled={isLoading} className={btnClass}>{isLoading ? 'Sending OTP...' : 'Register Account'}</button>
                      <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">Already registered?{' '}<button type="button" onClick={() => toggleAuthMode(true)} className="font-bold text-[#D4AF37] hover:text-[#b8952d] transition-colors">Sign In</button></p>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form key="reg-otp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerifyOTP} className="flex flex-col gap-5 pt-8">
                      <div className="text-center mb-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E6F2EC] rounded-full mb-4">
                          <svg className="w-8 h-8 text-[#006B3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-sm text-gray-500">We've sent a 6-digit code to <br/><span className="font-semibold text-[#292929]">{email}</span></p>
                      </div>
                      <div>
                        <label className="block text-center text-[#292929] text-sm font-semibold mb-2">Enter OTP</label>
                        <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className={`${inputClass} text-center tracking-[0.5em] text-xl font-bold py-4`} placeholder="••••••" maxLength={6} />
                      </div>
                      <button type="submit" disabled={isLoading || otp.length < 6} className={btnClass}>{isLoading ? 'Verifying...' : 'Verify & Complete'}</button>
                      <div className="text-center pt-2">
                        <button type="button" onClick={() => setRegStep('details')} className="text-sm text-gray-500 hover:text-[#006B3F] font-medium">Change Email</button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}