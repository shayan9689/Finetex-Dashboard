"use client";

import { Bell, Search, ChevronRight, Menu, Settings, LogOut, ChevronDown, Check } from 'lucide-react';
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

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New User Signup', time: '5 min ago', unread: true },
        { id: 2, title: 'Server Rebooted', time: '1 hr ago', unread: false },
        { id: 3, title: 'New Order Received', time: '3 hrs ago', unread: false },
    ]);
    const [markedAsReadToast, setMarkedAsReadToast] = useState(false);

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        setIsAlertsOpen(false);
        setMarkedAsReadToast(true);
        setTimeout(() => setMarkedAsReadToast(false), 1000);
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Breadcrumbs & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    <nav className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400">
                        {pathSegments.map((segment, index) => {
                            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                            return (
                                <div key={segment} className="flex items-center">
                                    {index > 0 && <ChevronRight size={14} className="mx-2 text-slate-400" />}
                                    <Link
                                        href={href}
                                        className="capitalize font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
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
                            className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-64 transition-all focus:w-72 shadow-sm placeholder:text-slate-400"
                            suppressHydrationWarning
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        {/* Alerts Dropdown */}
                        <div className="relative flex flex-col items-center" ref={alertsRef}>
                            <button
                                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                                className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                                suppressHydrationWarning
                            >
                                <Bell size={20} />
                                {notifications.some(n => n.unread) && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                                )}
                            </button>
                            <AnimatePresence>
                                {markedAsReadToast && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute -bottom-5 flex items-center justify-center"
                                    >
                                        <div className="p-1 bg-green-500 rounded-full">
                                            <Check size={14} className="text-white" strokeWidth={3} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {isAlertsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Notifications</p>
                                            <span
                                                onClick={handleMarkAllAsRead}
                                                className="text-xs text-primary font-medium hover:underline cursor-pointer"
                                            >
                                                Mark all as read
                                            </span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-50 dark:border-slate-700 last:border-0 cursor-pointer">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{notification.title}</p>
                                                        {notification.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>}
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Settings */}
                        <Link
                            href="/dashboard/settings"
                            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            aria-label="Settings"
                        >
                            <Settings size={20} />
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-600 hover:opacity-80 transition-opacity cursor-pointer"
                                suppressHydrationWarning
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Admin User</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
                                </div>
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
                                    A
                                </div>
                                <ChevronDown size={16} className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-700">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Signed in as</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">admin@fintex.com</p>
                                        </div>

                                        <div className="border-t border-slate-50 py-1">
                                            <button
                                                onClick={() => router.push('/login')}
                                                className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left font-medium"
                                            >
                                                <LogOut size={16} className="mr-3 text-red-600 dark:text-red-400" />
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
        </motion.header>
    );
}
