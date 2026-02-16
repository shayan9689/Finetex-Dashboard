"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, X, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotEmail.trim()) return;
        setForgotLoading(true);
        setTimeout(() => {
            setForgotLoading(false);
            setForgotSuccess(true);
        }, 1500);
    };

    const closeForgotModal = () => {
        setIsForgotModalOpen(false);
        setForgotEmail('');
        setForgotSuccess(false);
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={20} className="text-primary" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-primary" />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 ${password ? 'pr-10' : 'pr-3'}`}
                    />
                    {password && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(true)}
                        className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:opacity-95 active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {isForgotModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm"
                            onClick={closeForgotModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Forgot Password</h2>
                                <button
                                    onClick={closeForgotModal}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {forgotSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-4"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <Send size={32} className="text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Demo: Email Sent</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                                        In production, a password reset link would be sent to <span className="font-medium text-slate-700 dark:text-slate-300">{forgotEmail}</span>
                                    </p>
                                    <button
                                        onClick={closeForgotModal}
                                        className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-medium rounded-xl hover:opacity-95"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Enter your email and we'll send you a link to reset your password.
                                    </p>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeForgotModal}
                                            className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={forgotLoading}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-medium rounded-xl hover:opacity-95 disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {forgotLoading ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Reset Link
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
