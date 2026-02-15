"use client";

import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    UserPlus,
    Download,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2023-10-15', avatar: 'A' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Student', plan: 'Free', status: 'Inactive', joined: '2023-11-02', avatar: 'B' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2023-09-20', avatar: 'C' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Student', plan: 'Free', status: 'Suspended', joined: '2023-12-05', avatar: 'D' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Admin', plan: 'Team', status: 'Active', joined: '2023-08-10', avatar: 'E' },
    { id: 6, name: 'Fiona Green', email: 'fiona@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2024-01-12', avatar: 'F' },
    { id: 7, name: 'George Harris', email: 'george@example.com', role: 'Student', plan: 'Free', status: 'Active', joined: '2024-02-01', avatar: 'G' },
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Inactive': return 'bg-slate-100 text-slate-800';
            case 'Suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'Premium': return 'bg-amber-100 text-amber-800';
            case 'Team': return 'bg-purple-100 text-purple-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
                    <p className="text-slate-500 mt-1">Manage user access, roles, and subscriptions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                        <Download size={18} className="mr-2" />
                        Export
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/30 font-medium transition-colors">
                        <UserPlus size={18} className="mr-2" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-500 font-medium mr-2">Filter by Status:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Active', 'Inactive', 'Suspended'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === status
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Subscription</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold mr-3 border border-slate-200">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{user.name}</div>
                                                    <div className="text-slate-500 text-xs">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-700">{user.role}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                {user.status === 'Active' && <CheckCircle size={12} className="mr-1" />}
                                                {user.status === 'Suspended' && <AlertCircle size={12} className="mr-1" />}
                                                {user.status === 'Inactive' && <XCircle size={12} className="mr-1" />}
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No users found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed" disabled>Previous</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
