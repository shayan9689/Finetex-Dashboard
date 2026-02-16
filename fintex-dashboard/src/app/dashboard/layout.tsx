"use client";

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onToggle={() => setSidebarOpen(prev => !prev)} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-slate-50/50 dark:bg-slate-900/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="max-w-7xl mx-auto p-3 sm:p-6 md:p-8 min-h-[calc(100vh-140px)] w-full overflow-x-hidden"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
