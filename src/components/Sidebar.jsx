import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  User, 
  LogOut, 
  History,
  Settings,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Command,
  Edit2,
  Trash2,
  Check as CheckIcon,
  Layout,
  DownloadCloud
} from 'lucide-react';

/* 
  Next.js/Shadcn Inspired Sidebar
  Focuses on clean lines, subtle borders, and organized sections.
*/

const Tooltip = ({ text, isOpen, children }) => {
  if (isOpen) return children;
  return (
    <div className="group relative flex items-center">
      {children}
      <div className="absolute left-full ml-2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-md text-[11px] text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl">
        {text}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, onClick, isCollapsed, isActive, badge, className = "" }) => {
  return (
    <Tooltip text={label} isOpen={!isCollapsed}>
      <button
        onClick={onClick}
        className={`
          flex items-center group transition-all relative
          ${isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'w-full gap-3 px-3 h-10'} 
          rounded-xl text-zinc-400 hover:text-white hover:bg-white/5
          ${isActive ? 'text-white bg-white/10' : ''}
          ${className}
        `}
      >
        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors`} />
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full min-w-0">
            <span className="text-[13px] font-medium truncate">{label}</span>
            {badge && (
               <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded ml-auto">
                 {badge}
               </span>
            )}
          </div>
        )}
        {isActive && !isCollapsed && (
           <motion.div 
             layoutId="active-nav"
             className="absolute left-0 w-[2px] h-4 bg-white rounded-full"
           />
        )}
      </button>
    </Tooltip>
  );
};

const HistoryItem = ({ item, isCollapsed, isActive, onSelect, onRename, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync editValue when entering edit mode to fix "New Chat" stale state
  const handleStartEditing = () => {
    setEditValue(item.title);
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleRenameSubmit = () => {
    if (editValue.trim() && editValue !== item.title) {
      onRename(item.id, editValue);
    }
    setIsEditing(false);
  };

  if (isEditing && !isCollapsed) {
    return (
      <div className="px-3 py-1 flex items-center gap-2">
        <input 
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
          onBlur={handleRenameSubmit}
          className="flex-1 bg-zinc-900 border border-white/20 rounded px-2 py-1 text-[13px] text-white focus:outline-none focus:border-white/40"
        />
      </div>
    );
  }

  return (
    <div className="group/item relative">
      <SidebarItem 
        icon={History} 
        label={item.title} 
        onClick={() => onSelect(item.id)}
        isCollapsed={isCollapsed}
        isActive={isActive}
        className={!isCollapsed ? "pr-8" : ""}
      />
      {!isCollapsed && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity z-40">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-1.5 rounded-md hover:bg-white/10 text-zinc-500 hover:text-white transition-all shadow-sm"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  className="absolute right-0 top-full mt-1 w-32 bg-zinc-950 border border-white/10 rounded-lg shadow-2xl z-50 p-1"
                >
                  <button 
                    onClick={handleStartEditing}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-[12px] text-zinc-400 hover:text-white hover:bg-white/5 rounded"
                  >
                    <Edit2 className="w-3 h-3" /> Rename
                  </button>
                  <button 
                    onClick={() => {
                      onDelete(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-[12px] text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ 
  isSidebarCollapsed, 
  setIsSidebarCollapsed, 
  setView, 
  handleLogout, 
  handleNewChat,
  handleSelectChat,
  handleDeleteChat,
  handleRenameChat,
  currentChatId,
  user,
  chatHistory = []
}) => {
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState(false);

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 64 }
  };

  return (
    <motion.aside
      initial={isSidebarCollapsed ? "collapsed" : "expanded"}
      animate={isSidebarCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      className="fixed inset-y-0 left-0 z-50 bg-[#030303] border-r border-white/5 flex flex-col overflow-visible no-scrollbar"
    >
      {/* Sidebar Header */}
      <div className={`p-4 h-14 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        <AnimatePresence mode="wait">
          {!isSidebarCollapsed && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 font-bold tracking-tight text-sm select-none cursor-pointer"
              onClick={() => setView('landing')}
            >
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-lg">
                <Command className="w-4 h-4 text-black" />
              </div>
              <span>Frontend<span className="text-zinc-500">.slm</span></span>
            </motion.div>
          )}
          {isSidebarCollapsed && (
             <motion.div 
               key="logo-collapsed"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
               onClick={() => setIsSidebarCollapsed(false)}
             >
               <Command className="w-5 h-5 text-white" />
             </motion.div>
          )}
        </AnimatePresence>
        {!isSidebarCollapsed && (
          <Tooltip text="Close Sidebar" isOpen={false}>
            <button 
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-1.5 rounded-md hover:bg-white/10 text-zinc-500 hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </Tooltip>
        )}
      </div>

      <div className="flex-1 flex flex-col px-3 py-4 space-y-6 overflow-y-auto no-scrollbar">
        {/* NEW CHAT SECTION */}
        <div className="px-1 w-full">
          <Tooltip text="New Chat" isOpen={!isSidebarCollapsed}>
            <button 
              onClick={handleNewChat}
              className={`
                flex items-center group relative mx-auto
                ${isSidebarCollapsed ? 'justify-center h-10 w-10' : 'w-full gap-2 px-4 h-10'} 
                bg-white text-black rounded-xl text-sm font-bold
                hover:bg-zinc-100 transition-all 
                shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
              `}
            >
              <Plus className="w-4 h-4" />
              {!isSidebarCollapsed && <span className="text-[14px]">New Chat</span>}
            </button>
          </Tooltip>
        </div>

        {/* NAVIGATION GROUP */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">General</p>
          )}
          <SidebarItem 
            icon={Layout} 
            label="My Content" 
            isCollapsed={isSidebarCollapsed} 
            isActive={false}
          />
        </div>

        {/* RECENT HISTORY GROUP */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">Recent</p>
          )}
          <div className="space-y-0.5 max-h-[400px] overflow-y-auto no-scrollbar pb-20">
            {chatHistory.map((item) => (
              <HistoryItem 
                key={item.id}
                item={item}
                isCollapsed={isSidebarCollapsed}
                isActive={currentChatId === item.id}
                onSelect={handleSelectChat}
                onRename={handleRenameChat}
                onDelete={handleDeleteChat}
              />
            ))}
            {chatHistory.length === 0 && !isSidebarCollapsed && (
              <p className="text-[11px] text-zinc-700 px-3 italic py-4">No recent chats</p>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER / USER ACCOUNT */}
      <div className="mt-auto border-t border-white/5 p-3">
        <div className="relative w-full">
          <Tooltip text="Account Settings" isOpen={!isSidebarCollapsed}>
            <button 
              onClick={() => setIsFooterMenuOpen(!isFooterMenuOpen)}
              className={`
                flex items-center p-2 rounded-xl transition-all mx-auto
                ${isSidebarCollapsed ? 'justify-center w-10 h-10' : 'w-full gap-3 px-2'} 
                hover:bg-white/5 group relative
              `}
            >
              <div className={`rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden text-[11px] font-bold text-white shadow-inner icon-gradient ${isSidebarCollapsed ? 'w-full h-full' : 'w-8 h-8'}`}>
                {user?.name?.[0] || <User className="w-4 h-4" />}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1 flex flex-col items-start min-w-0">
                  <span className="text-[13px] font-semibold text-white truncate w-full tracking-tight">{user?.name || "Account"}</span>
                  <span className="text-[11px] text-zinc-500 truncate w-full font-medium">{user?.email || "Free Plan"}</span>
                </div>
              )}
              {!isSidebarCollapsed && <MoreVertical className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white shrink-0" />}
            </button>
          </Tooltip>

          <AnimatePresence>
            {isFooterMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFooterMenuOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`
                    absolute bottom-full left-0 mb-2 w-full min-w-[220px] z-50
                    bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-1.5
                  `}
                >
                   <button onClick={() => { setView('download'); setIsFooterMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-2.5 py-2.5 text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                     <DownloadCloud className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                     Download Pro Model
                   </button>
                   <button onClick={() => { setView('settings'); setIsFooterMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-2.5 py-2.5 text-[13px] text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                     <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                     Settings
                   </button>
                   <div className="h-px bg-white/5 my-1" />
                   <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-2.5 py-2.5 text-[13px] text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                     <LogOut className="w-4 h-4" />
                     Sign Out
                   </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};
