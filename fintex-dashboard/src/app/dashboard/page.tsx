"use client";

import Link from 'next/link';
import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import DashboardCharts from '@/components/charts/DashboardCharts';
import { motion } from 'framer-motion';

const staggerItem = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" as const },
};

export default function DashboardPage() {
    const stats = [
        {
            name: 'Total Clients',
            value: '12,345',
            change: '+5.4%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-500',
            href: '/dashboard/clients',
        },
        {
            name: 'Active Learners',
            value: '8,234',
            change: '+2.3%',
            trend: 'up',
            icon: BookOpen,
            color: 'bg-green-500',
            href: '/dashboard/content',
        },
        {
            name: 'Revenue',
            value: '$43,210',
            change: '+4.1%',
            trend: 'up',
            icon: CreditCard,
            color: 'bg-purple-500',
            href: '/dashboard/finance',
        },
        {
            name: 'Completion Rate',
            value: '78%',
            change: '+4.1%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-orange-500',
            href: '/dashboard/content',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="initial"
                animate="animate"
                variants={{
                    animate: { transition: { staggerChildren: 0.08 } },
                }}
            >
                {stats.map((stat, i) => (
                    <motion.div key={stat.name} variants={staggerItem}>
                    <Link
                        href={stat.href}
                        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 block cursor-pointer hover:shadow-md hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</h3>
                        </div>
                    </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <DashboardCharts />
            </motion.div>
        </motion.div>
    );
}
