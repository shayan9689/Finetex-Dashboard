"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
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
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md text-slate-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={clsx(
                    "fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-600 to-blue-800 border-r border-blue-500/30 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col shadow-2xl md:shadow-none",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="h-24 flex items-center px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 text-blue-600 font-bold text-xl">F</div>
                        <span className="text-2xl font-bold text-white tracking-tight">Fintex</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-white text-blue-600 shadow-md shadow-blue-900/10"
                                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        "mr-3 flex-shrink-0 h-5 w-5",
                                        isActive ? "text-blue-600" : "text-blue-200 group-hover:text-white"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-blue-500/30 space-y-1">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-white/80 rounded-xl hover:bg-white/10 hover:text-white transition-colors text-left"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-blue-200 group-hover:text-white" />
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
