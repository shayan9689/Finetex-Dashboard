import { Users, BookOpen, CreditCard, TrendingUp, MoreHorizontal } from 'lucide-react';

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

    const recentUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', plan: 'Premium', status: 'Active', date: '2 mins ago' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', plan: 'Free', status: 'Active', date: '15 mins ago' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', plan: 'Premium', status: 'Inactive', date: '1 hour ago' },
        { id: 4, name: 'Diana Ross', email: 'diana@example.com', plan: 'Free', status: 'Active', date: '3 hours ago' },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', plan: 'Premium', status: 'Active', date: '5 hours ago' },
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

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Recent Signups</h2>
                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold mr-3">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{user.name}</div>
                                                <div className="text-slate-500 text-xs">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.plan === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{user.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={20} />
                                        </button>
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
