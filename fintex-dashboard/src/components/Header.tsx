"use client";

import { Bell, Search, ChevronRight, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAlertsOpen, setIsAlertsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const alertsRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
                setIsAlertsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const pathSegments = pathname.split('/').filter(Boolean);

    const notifications = [
        { id: 1, title: 'New User Signup', time: '5 min ago', unread: true },
        { id: 2, title: 'Server Rebooted', time: '1 hr ago', unread: false },
        { id: 3, title: 'New Order Received', time: '3 hrs ago', unread: false },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Breadcrumbs & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <nav className="hidden md:flex items-center text-sm text-slate-500">
                        <Link href="/dashboard" className="font-medium text-slate-800 hover:text-primary transition-colors">
                            Fintex
                        </Link>
                        {pathSegments.map((segment, index) => {
                            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                            return (
                                <div key={segment} className="flex items-center">
                                    <ChevronRight size={14} className="mx-2 text-slate-400" />
                                    <Link
                                        href={href}
                                        className="capitalize font-medium text-slate-600 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                                    >
                                        {segment}
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center relative group">
                        <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all focus:w-72 shadow-sm placeholder:text-slate-400"
                            suppressHydrationWarning
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        {/* Alerts Dropdown */}
                        <div className="relative" ref={alertsRef}>
                            <button
                                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                                className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
                                suppressHydrationWarning
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>

                            <AnimatePresence>
                                {isAlertsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
                                            <p className="text-sm font-bold text-slate-900">Notifications</p>
                                            <span className="text-xs text-primary font-medium hover:underline cursor-pointer">Mark all as read</span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-sm text-slate-800 font-medium">{notification.title}</p>
                                                        {notification.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity"
                                suppressHydrationWarning
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-slate-800">Admin User</p>
                                    <p className="text-xs text-slate-500">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                    A
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50">
                                            <p className="text-sm font-medium text-slate-900">Signed in as</p>
                                            <p className="text-sm text-slate-500 truncate">admin@fintex.com</p>
                                        </div>

                                        <div className="py-1">
                                            <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                <Settings size={16} className="mr-3 text-slate-400" />
                                                Settings
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-50 py-1">
                                            <button
                                                onClick={() => router.push('/login')}
                                                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <LogOut size={16} className="mr-3" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
