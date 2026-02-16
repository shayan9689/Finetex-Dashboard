"use client";

import { HelpCircle, Book, MessageCircle, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpPage() {
    const faqs = [
        { question: 'How do I add a new user?', answer: 'Navigate to the Users page and click the "Add User" button in the top right corner.' },
        { question: 'How do I publish a lesson?', answer: 'Go to Content Management, select a draft lesson, and change its status to "Published".' },
        { question: 'Can I export financial reports?', answer: 'Yes, go to the Finance page and click "Export Report" to download a CSV file.' },
        { question: 'How do I reset my password?', answer: 'Go to Settings > Security and click "Change Password".' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8 max-w-4xl mx-auto"
        >
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">How can we help you?</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Search our knowledge base or contact support.</p>
                <div className="mt-6 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        className="w-full px-4 py-3 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial="initial"
                animate="animate"
                variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            >
                <motion.div
                    variants={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                >
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Book size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Documentation</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Read detailed guides on how to use the dashboard.</p>
                </motion.div>
                <motion.div
                    variants={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                >
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Chat Support</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Chat with our support team in real-time.</p>
                </motion.div>
                <motion.div
                    variants={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer text-center"
                >
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">API Reference</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Technical documentation for developers.</p>
                </motion.div>
            </motion.div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-slate-100 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
                            <button className="w-full flex items-center justify-between text-left group">
                                <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{faq.question}</span>
                                <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            </button>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 pr-8">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
