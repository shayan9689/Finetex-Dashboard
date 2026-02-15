"use client";

import { DollarSign, CreditCard, TrendingUp, Download, Calendar } from 'lucide-react';

export default function FinancePage() {
    const transactions = [
        { id: 1, user: 'Alice Johnson', type: 'Subscription', plan: 'Annual Premium', amount: '$99.99', date: '2023-10-15', status: 'Success' },
        { id: 2, user: 'Bob Smith', type: 'Purchase', plan: 'Course: Advanced Investing', amount: '$49.99', date: '2023-10-14', status: 'Success' },
        { id: 3, user: 'Charlie Brown', type: 'Subscription', plan: 'Monthly Premium', amount: '$9.99', date: '2023-10-14', status: 'Failed' },
        { id: 4, user: 'Diana Ross', type: 'Refund', plan: 'Annual Premium', amount: '-$99.99', date: '2023-10-13', status: 'Refunded' },
        { id: 5, user: 'Evan Wright', type: 'Subscription', plan: 'Annual Premium', amount: '$99.99', date: '2023-10-12', status: 'Success' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Finance & Revenue</h1>
                    <p className="text-slate-500 mt-1">Track subscriptions, payments, and revenue streams.</p>
                </div>
                <div>
                    <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                        <Download size={18} className="mr-2" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-50 text-green-600">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">$124,500</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.2%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase">Active Subscriptions</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">2,845</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">-2.1%</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase">Churn Rate</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">1.2%</h3>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                    <button className="text-primary text-sm font-medium hover:underline flex items-center">
                        <Calendar size={16} className="mr-1" /> View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Plan/Item</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{tx.user}</td>
                                    <td className="px-6 py-4 text-slate-600">{tx.type}</td>
                                    <td className="px-6 py-4 text-slate-600">{tx.plan}</td>
                                    <td className={`px-6 py-4 font-medium ${tx.amount.startsWith('-') ? 'text-red-600' : 'text-slate-900'}`}>
                                        {tx.amount}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Success' ? 'bg-green-100 text-green-800' :
                                                tx.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                                    'bg-slate-100 text-slate-800'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
