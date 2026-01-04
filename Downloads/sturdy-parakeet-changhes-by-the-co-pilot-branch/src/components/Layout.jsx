import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code, PlusCircle, Settings, LogOut, Menu, Palette, Bot, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AISidebar from './AISidebar';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
    >
        <Icon size={20} className={active ? 'text-primary' : 'group-hover:text-white'} />
        <span className="font-medium">{label}</span>
    </Link>
);

const Layout = ({ children }) => {
    const location = useLocation();
    const { currentTheme, setCurrentTheme, themes } = useTheme();
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-500">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/20 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold gradient-text tracking-tight">CodePortal</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        to="/"
                        active={location.pathname === '/'}
                    />
                    <SidebarItem
                        icon={Code}
                        label="Problems"
                        to="/problems"
                        active={location.pathname === '/problems'}
                    />
                    <SidebarItem
                        icon={PlusCircle}
                        label="Assign Problem"
                        to="/assign"
                        active={location.pathname === '/assign'}
                    />
                    <SidebarItem
                        icon={BarChart2}
                        label="Visualizer"
                        to="/visualizer"
                        active={location.pathname === '/visualizer'}
                    />
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    {/* Theme Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
                        >
                            <Palette size={20} />
                            <span className="font-medium">Theme: {themes[currentTheme].name}</span>
                        </button>
                        {isThemeMenuOpen && (
                            <div className="absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-white/10 rounded-lg overflow-hidden shadow-xl max-h-60 overflow-y-auto z-50">
                                {Object.entries(themes).map(([key, theme]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setCurrentTheme(key);
                                            setIsThemeMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/20 hover:text-primary transition-colors ${currentTheme === key ? 'text-primary bg-primary/10' : 'text-gray-400'}`}
                                    >
                                        {theme.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsAIOpen(true)}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 transition-all duration-200"
                    >
                        <Bot size={20} />
                        <span className="font-medium">AI Assistant</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile Header */}
                <header className="md:hidden h-16 border-b border-white/10 flex items-center px-4 justify-between bg-black/20">
                    <h1 className="text-xl font-bold gradient-text">CodePortal</h1>
                    <button className="p-2 text-gray-400">
                        <Menu size={24} />
                    </button>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8 relative">
                    {/* Background Gradients - Dynamic based on theme */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-50">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>

            {/* AI Sidebar */}
            <AISidebar isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        </div>
    );
};

export default Layout;
