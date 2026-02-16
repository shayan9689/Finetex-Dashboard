"use client";

import LoginForm from '@/components/forms/LoginForm';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginPage() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 relative overflow-hidden items-center justify-center p-8 xl:p-12">
                {/* Abstract Shapes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-400 blur-[120px]"
                />

                <div className="relative z-10 max-w-lg text-center text-white">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 flex items-center justify-center gap-5"
                    >
                        <img
                            src="/fintex-logo.png"
                            alt="Fintex"
                            className="w-20 h-20 rounded-2xl object-cover shadow-2xl border border-white/20 flex-shrink-0"
                        />
                        <h1 className="text-6xl font-bold tracking-tight fintex-gradient-animate [filter:drop-shadow(0_0_30px_rgba(255,255,255,0.5))_drop-shadow(0_0_60px_rgba(167,243,208,0.4))]">
                            Fintex
                        </h1>
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-bold mb-6 leading-tight"
                    >
                        Master Finance with <br /> <span className="text-emerald-200">Confidence</span>
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg text-emerald-100 leading-relaxed"
                    >
                        "The robust admin solution for managing users, content, and revenue streams all in one place."
                    </motion.p>
                </div>

                {/* Glass Cards Decoration */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-64 shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div>
                            <div className="h-2 w-20 bg-white/20 rounded-full mb-1"></div>
                            <div className="h-2 w-12 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                    <div className="h-16 w-full bg-white/5 rounded-xl"></div>
                </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-slate-900 relative">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="absolute top-6 right-6 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-3 mb-6 lg:hidden">
                                <img
                                    src="/fintex-logo.png"
                                    alt="Fintex"
                                    className="w-14 h-14 rounded-2xl object-cover shadow-lg flex-shrink-0"
                                />
                                <span className="text-3xl font-bold tracking-tight fintex-gradient-animate-dark [filter:drop-shadow(0_0_20px_rgba(5,150,105,0.4))]">
                                    Fintex
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">Welcome Back</h1>
                            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
                        </div>

                        <LoginForm />

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-400 dark:text-slate-500">
                                © 2024 Fintex Admin Dashboard. All rights reserved.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
