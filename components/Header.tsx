import React from 'react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; name: string }[] = [
    { id: 'analysis', name: 'Skin Analysis' },
    { id: 'recommendations', name: 'Recommendations' },
    { id: 'history', name: 'History' },
  ];

  const NavItem: React.FC<{ tab: { id: Tab; name:string } }> = ({ tab }) => {
    const isActive = activeTab === tab.id;
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
          isActive
            ? 'text-white bg-cyan-500'
            : 'text-gray-600 hover:text-cyan-600'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {tab.name}
      </button>
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Aura Skincare
            </h1>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {tabs.map((tab) => (
              <NavItem key={tab.id} tab={tab} />
            ))}
          </div>
        </div>
        <div className="sm:hidden flex justify-around p-2 border-t border-gray-200">
            {tabs.map((tab) => (
              <NavItem key={tab.id} tab={tab} />
            ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;