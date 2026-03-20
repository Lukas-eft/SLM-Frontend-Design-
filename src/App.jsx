import React, { useState, useEffect } from 'react';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';
import { ChatView } from './views/ChatView';
import { LoadingView } from './views/LoadingView';
import { ProfileView } from './views/ProfileView';
import { DocsView } from './views/DocsView';

export default function App() {
  const [view, setView] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Simulate initial app load - shorter duration for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ilu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('ilu_user');
    setUser(null);
    setView('landing');
  };

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ilu_users') || '[]');
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem('ilu_user', JSON.stringify(foundUser));
      setUser(foundUser);
      setView('chat');
      return true;
    }
    return false;
  };

  const handleSignup = (userData) => {
    const users = JSON.parse(localStorage.getItem('ilu_users') || '[]');
    if (users.some((u) => u.email === userData.email)) {
      return false;
    }
    users.push(userData);
    localStorage.setItem('ilu_users', JSON.stringify(users));
    localStorage.setItem('ilu_user', JSON.stringify(userData));
    setUser(userData);
    setView('chat');
    return true;
  };

  // Mock data for UI demonstration
  const chatHistory = [
    { id: 1, title: "Quantum Physics Basics", date: "2h ago" },
    { id: 2, title: "React Performance Tips", date: "5h ago" },
    { id: 3, title: "Python FastAPI Setup", date: "Yesterday" },
  ];

  const messages = [
    { role: 'user', content: "What is a Small Language Model?" },
    { role: 'assistant', content: "A Small Language Model (SLM) is a compact version of a Large Language Model (LLM). While LLMs like GPT-4 have hundreds of billions of parameters, SLMs focus on efficiency and speed, often with fewer than 10 billion parameters. They are ideal for use on local hardware or for specific tasks." },
  ];

  return (
    <div className="antialiased text-zinc-300">
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          {view === 'landing' && <LandingView setView={setView} user={user} />}
          {view === 'login' && (
            <LoginView 
              setView={setView} 
              handleLogin={handleLogin} 
              showPassword={showPassword} 
              setShowPassword={setShowPassword} 
            />
          )}
          {view === 'signup' && (
            <SignupView 
              setView={setView} 
              handleSignup={handleSignup} 
              showPassword={showPassword} 
              setShowPassword={setShowPassword} 
            />
          )}
          {view === 'chat' && (
            <ChatView 
              setView={setView} 
              isSidebarCollapsed={isSidebarCollapsed} 
              setIsSidebarCollapsed={setIsSidebarCollapsed} 
              user={user} 
              handleLogout={handleLogout} 
              chatHistory={chatHistory} 
              messages={messages} 
            />
          )}
          {view === 'profile' && (
            <ProfileView 
              setView={setView} 
              user={user} 
              setUser={setUser}
              handleLogout={handleLogout} 
            />
          )}
          {view === 'docs' && (
            <DocsView 
              setView={setView} 
              user={user} 
            />
          )}
        </>
      )}
    </div>
  );
}
