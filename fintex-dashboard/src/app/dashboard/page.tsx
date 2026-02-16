import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import DashboardCharts from '@/components/DashboardCharts';

export default function DashboardPage() {
    const stats = [
        {
            name: 'Total Users',
            value: '12,345',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            name: 'Active Learners',
            value: '8,234',
            change: '+5.4%',
            trend: 'up',
            icon: BookOpen,
            color: 'bg-green-500',
        },
        {
            name: 'Revenue',
            value: '$43,210',
            change: '+2.3%',
            trend: 'up',
            icon: CreditCard,
            color: 'bg-purple-500',
        },
        {
            name: 'Completion Rate',
            value: '78%',
            change: '+4.1%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-orange-500',
        },
    ];



    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                <stat.icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                            </div>
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} bg-green-50 px-2 py-1 rounded-full`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <DashboardCharts />
        </div>
    );
}
