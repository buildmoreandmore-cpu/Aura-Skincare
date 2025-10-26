import React from 'react';
import { Tab } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, signOut } = useAuth();

  const tabs: { id: Tab; name: string }[] = [
    { id: 'analysis', name: 'Skin Analysis' },
    { id: 'recommendations', name: 'Recommendations' },
  ];

  const NavItem: React.FC<{ tab: { id: Tab; name:string } }> = ({ tab }) => {
    const isActive = activeTab === tab.id;
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`px-4 py-2 text-sm md:text-base font-light rounded-2xl transition-all duration-300 ${
          isActive
            ? 'text-white bg-gradient-to-r from-cyan-400 to-blue-400 shadow-md'
            : 'text-gray-600 hover:text-cyan-600 hover:bg-cyan-50'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {tab.name}
      </button>
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-light tracking-tight text-gray-900">
              Aura
            </h1>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {tabs.map((tab) => (
              <NavItem key={tab.id} tab={tab} />
            ))}
            {user && (
              <button
                onClick={signOut}
                className="ml-4 px-4 py-2 text-sm font-light text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            {user && (
              <button
                onClick={signOut}
                className="px-3 py-1.5 text-xs font-light text-gray-600"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        <div className="sm:hidden flex justify-around pb-3 border-t border-gray-100 pt-3">
            {tabs.map((tab) => (
              <NavItem key={tab.id} tab={tab} />
            ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;