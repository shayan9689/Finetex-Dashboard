"use client";

import { HelpCircle, Book, MessageCircle, FileText, ChevronRight } from 'lucide-react';

export default function HelpPage() {
    const faqs = [
        { question: 'How do I add a new user?', answer: 'Navigate to the Users page and click the "Add User" button in the top right corner.' },
        { question: 'How do I publish a lesson?', answer: 'Go to Content Management, select a draft lesson, and change its status to "Published".' },
        { question: 'Can I export financial reports?', answer: 'Yes, go to the Finance page and click "Export Report" to download a CSV file.' },
        { question: 'How do I reset my password?', answer: 'Go to Settings > Security and click "Change Password".' },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">How can we help you?</h1>
                <p className="text-slate-500 mt-2">Search our knowledge base or contact support.</p>
                <div className="mt-6 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        className="w-full px-4 py-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Book size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900">Documentation</h3>
                    <p className="text-sm text-slate-500 mt-2">Read detailed guides on how to use the dashboard.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer text-center">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900">Chat Support</h3>
                    <p className="text-sm text-slate-500 mt-2">Chat with our support team in real-time.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer text-center">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-900">API Reference</h3>
                    <p className="text-sm text-slate-500 mt-2">Technical documentation for developers.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                            <button className="w-full flex items-center justify-between text-left group">
                                <span className="font-medium text-slate-900 group-hover:text-primary transition-colors">{faq.question}</span>
                                <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                            </button>
                            <p className="text-slate-500 text-sm mt-2 pr-8">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
