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
                    "fixed inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col shadow-2xl md:shadow-none",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="h-24 flex items-center px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 text-white font-bold text-xl">F</div>
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">Fintex</span>
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
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        "mr-3 flex-shrink-0 h-5 w-5",
                                        isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-500"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-100 space-y-1">
                    <Link
                        href="/dashboard/help"
                        className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <HelpCircle className="mr-3 h-5 w-5 text-slate-400" />
                        Help Center
                    </Link>
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors text-left"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-400" />
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
