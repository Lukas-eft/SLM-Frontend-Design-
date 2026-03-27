import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Calendar, Shield, ArrowLeft, LogOut, Settings, Camera, Check, Cpu, Zap, Lock, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Navbar } from '../components/Navbar';

export const ProfileView = ({ setView, user, setUser, handleLogout }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordStatus, setPasswordStatus] = useState('');
  const [emailStatus, setEmailStatus] = useState('');

  if (!user) {
    setView('login');
    return null;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedUser = { ...user, profilePic: base64String };
        
        // Update current user
        setUser(updatedUser);
        localStorage.setItem('frontend_user', JSON.stringify(updatedUser));
        
        // Update in users list
        const users = JSON.parse(localStorage.getItem('frontend_users') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
        localStorage.setItem('frontend_users', JSON.stringify(updatedUsers));
        
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordStatus('Passwords do not match');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('frontend_users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex !== -1 && users[userIndex].password === passwordForm.current) {
      users[userIndex].password = passwordForm.new;
      localStorage.setItem('frontend_users', JSON.stringify(users));
      
      const updatedUser = { ...user, password: passwordForm.new };
      setUser(updatedUser);
      localStorage.setItem('frontend_user', JSON.stringify(updatedUser));
      
      setPasswordStatus('Password updated successfully');
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordForm({ current: '', new: '', confirm: '' });
        setPasswordStatus('');
      }, 2000);
    } else {
      setPasswordStatus('Incorrect current password');
    }
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    if (newEmail === user.email) {
      setEmailStatus('Email is the same');
      return;
    }

    const users = JSON.parse(localStorage.getItem('frontend_users') || '[]');
    const emailExists = users.some(u => u.email === newEmail);

    if (emailExists) {
      setEmailStatus('Email already in use');
      return;
    }

    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      const updatedUser = { ...user, email: newEmail };
      users[userIndex].email = newEmail;
      
      localStorage.setItem('frontend_users', JSON.stringify(users));
      localStorage.setItem('frontend_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setEmailStatus('Email updated successfully');
      setTimeout(() => {
        setIsUpdatingEmail(false);
        setEmailStatus('');
      }, 2000);
    }
  };

  const usageData = [
    { name: 'Mar 14', tokens: 120000 },
    { name: 'Mar 15', tokens: 150000 },
    { name: 'Mar 16', tokens: 450000 },
    { name: 'Mar 17', tokens: 320000 },
    { name: 'Mar 18', tokens: 580000 },
    { name: 'Mar 19', tokens: 850000 },
    { name: 'Mar 20', tokens: 1200000 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar setView={setView} user={user} />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-16"
        >
          {/* Hero Profile Section */}
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full bg-zinc-900 border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-white/20 transition-all duration-500">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className="w-20 h-20 text-zinc-700" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-3 bg-white text-black rounded-full hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Pro Member
                </span>
              </div>
            </div>
          </div>

          {/* Bento Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Card */}
            <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-4xl p-8 lg:p-10 space-y-8 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Account Identity</h3>
                <Mail className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              
              {!isChangingPassword && !isUpdatingEmail ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Primary Email</p>
                      <p className="text-xl font-medium text-white">{user.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Member Since</p>
                      <p className="text-xl font-medium text-white">March 2026</p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-white/5 flex gap-4">
                    <button 
                      onClick={() => {
                        setIsUpdatingEmail(true);
                        setNewEmail(user.email);
                      }}
                      className="text-xs font-bold bg-white text-black px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-all"
                    >
                      Update Email
                    </button>
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="text-xs font-bold border border-white/10 px-6 py-2.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                      Change Password
                    </button>
                  </div>
                </>
              ) : isUpdatingEmail ? (
                <form onSubmit={handleEmailUpdate} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">New Email Address</label>
                    <input 
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full max-w-md bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  
                  {emailStatus && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${emailStatus.includes('success') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {emailStatus}
                    </p>
                  )}

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="submit"
                      className="text-xs font-bold bg-white text-black px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-all"
                    >
                      Save Email
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsUpdatingEmail(false);
                        setEmailStatus('');
                      }}
                      className="text-xs font-bold border border-white/10 px-6 py-2.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Current Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">New Password</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.new}
                        onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Confirm New</label>
                      <input 
                        type="password"
                        required
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                      />
                    </div>
                  </div>
                  
                  {passwordStatus && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${passwordStatus.includes('success') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {passwordStatus}
                    </p>
                  )}

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="submit"
                      className="text-xs font-bold bg-white text-black px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-all"
                    >
                      Save New Password
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordStatus('');
                        setPasswordForm({ current: '', new: '', confirm: '' });
                      }}
                      className="text-xs font-bold border border-white/10 px-6 py-2.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Usage Stats Card */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-4xl p-8 lg:p-10 space-y-8 hover:border-white/20 transition-all group overflow-hidden relative flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Token Intelligence</h3>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-500">+24% from last week</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-50 relative z-10 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tokens" 
                      stroke="#ffffff" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorTokens)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6 relative z-10 pt-4 border-t border-white/5 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-4xl font-black tracking-tighter text-white">1.2M</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total tokens this cycle</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">85%</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quota Used</p>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-linear-to-r from-zinc-500 to-white" 
                  />
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-4xl p-8 lg:p-10 space-y-8 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Preferences</h3>
                <Settings className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-medium text-zinc-300">Dark Mode</span>
                  <div className="w-10 h-5 bg-white rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-medium text-zinc-300">Auto-Save History</span>
                  <div className="w-10 h-5 bg-zinc-800 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Card */}
            <div 
              onClick={handleLogout}
              className="md:col-span-1 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-4xl p-8 lg:p-10 flex flex-col items-center justify-center gap-6 hover:border-white/20 hover:bg-white/5 transition-all group cursor-pointer active:scale-[0.98]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LogOut className="w-8 h-8 text-zinc-500 group-hover:text-red-400 transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white tracking-tight">Sign Out</h3>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <button 
              onClick={() => setView('landing')}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold tracking-tight">Back to Dashboard</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
