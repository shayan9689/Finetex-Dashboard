"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Content", href: "/dashboard/content", icon: BookOpen },
    { name: "Finance", href: "/dashboard/finance", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md text-slate-600 dark:text-slate-300 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={clsx(
                    "fixed inset-y-0 left-0 z-40 w-64 sm:w-72 bg-gradient-to-b from-emerald-700 via-teal-700 to-cyan-800 border-r border-emerald-500/20 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col shadow-2xl md:shadow-none",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo - click to go to overview */}
                <div className="h-24 flex items-center px-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer hover:bg-white/15 transition-colors"
                        onClick={(e) => {
                            setIsOpen(false);
                            if (pathname === "/dashboard") {
                                e.preventDefault();
                                window.location.href = "/dashboard";
                            }
                        }}
                    >
                        <img
                            src="/fintex-logo.png"
                            alt="Fintex"
                            className="w-11 h-11 rounded-xl object-cover shadow-md border border-white/30 flex-shrink-0"
                        />
                        <span className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">Fintex</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const isSameSection = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    if (isSameSection) {
                                        e.preventDefault();
                                        window.location.href = item.href;
                                    }
                                    setIsOpen(false);
                                }}
                                className={clsx(
                                    "flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-white text-emerald-700 shadow-md shadow-emerald-900/20"
                                        : "text-emerald-100 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        "mr-3 flex-shrink-0 h-5 w-5",
                                        isActive ? "text-emerald-700" : "text-emerald-200 group-hover:text-white"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-emerald-500/20 space-y-1">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-300 rounded-xl hover:bg-red-500/20 hover:text-white transition-colors text-left group"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-300 group-hover:text-white" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
