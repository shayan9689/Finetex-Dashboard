"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle,
    Ban,
    UserCheck,
    ChevronDown,
    LayoutGrid,
    Plus,
    X,
    Trash2
} from 'lucide-react';

const initialDashboardUsers = [
    { id: 1, name: 'Admin User', email: 'admin@fintex.com', role: 'Admin', status: 'Active', grantedAt: '2023-08-01', avatar: 'A' },
    { id: 2, name: 'Support Agent', email: 'support@fintex.com', role: 'Support', status: 'Active', grantedAt: '2024-01-15', avatar: 'S' },
];

const STATUS_OPTIONS = ['All', 'Active', 'Revoked'] as const;

type DashboardUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    grantedAt: string;
    avatar: string;
};

export default function ManageUsersPage() {
    const [users, setUsers] = useState<DashboardUser[]>(initialDashboardUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (menuRef.current && !menuRef.current.contains(target)) setOpenMenuId(null);
            if (filterRef.current && !filterRef.current.contains(target)) setFilterDropdownOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDeleteUser = (user: DashboardUser) => {
        if (confirm(`Remove ${user.name} from dashboard access? This action cannot be undone.`)) {
            setUsers(prev => prev.filter(u => u.id !== user.id));
            setOpenMenuId(null);
        }
    };

    const handleRevokeAccess = (user: DashboardUser) => {
        if (confirm(`Revoke dashboard access for ${user.name}? They will no longer be able to log in.`)) {
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Revoked' as const } : u));
            setOpenMenuId(null);
        }
    };

    const handleRestoreAccess = (user: DashboardUser) => {
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Active' as const } : u));
        setOpenMenuId(null);
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserEmail.trim()) {
            alert('Please enter an email address.');
            return;
        }
        if (!newUserPassword.trim() || newUserPassword.length < 8) {
            alert('Password must be at least 8 characters.');
            return;
        }
        const name = newUserName.trim() || newUserEmail.split('@')[0];
        const nextId = Math.max(0, ...users.map(u => u.id)) + 1;
        const newUser: DashboardUser = {
            id: nextId,
            name,
            email: newUserEmail.trim(),
            role: 'Admin',
            status: 'Active',
            grantedAt: new Date().toISOString().slice(0, 10),
            avatar: name.charAt(0).toUpperCase(),
        };
        setUsers(prev => [...prev, newUser]);
        const credentialsTxt = [
            'Fintex Dashboard - Login Credentials',
            '',
            `Email: ${newUserEmail.trim()}`,
            `Name: ${name}`,
            `Password: ${newUserPassword}`,
        ].join('\r\n');
        const blob = new Blob([credentialsTxt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fintex-credentials-${newUserEmail.trim().split('@')[0]}-${new Date().toISOString().slice(0, 10)}.txt`;
        link.click();
        URL.revokeObjectURL(url);
        setNewUserEmail('');
        setNewUserName('');
        setNewUserPassword('');
        setIsAddUserModalOpen(false);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
            case 'Revoked': return <Ban size={16} className="text-red-600 dark:text-red-400" />;
            default: return <LayoutGrid size={16} className="text-slate-500 dark:text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Revoked': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Manage Users</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Grant or revoke dashboard access. These users are independent from clients.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative" ref={filterRef}>
                <button
                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${filterStatus !== 'All'
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/30 hover:opacity-95'
                        : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                    }`}
                >
                    {filterStatus !== 'All' ? getStatusIcon(filterStatus) : <Filter size={18} />}
                    <span className="text-sm font-medium">{filterStatus}</span>
                    <ChevronDown size={16} className={`transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {filterDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute left-0 mt-2 py-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-20"
                        >
                            {STATUS_OPTIONS.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setFilterStatus(status);
                                        setFilterDropdownOpen(false);
                                    }}
                                    className={`w-full flex justify-start items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                                        filterStatus === status
                                            ? 'mx-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white'
                                            : 'mx-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {status !== 'All' ? getStatusIcon(status) : <LayoutGrid size={16} className="text-slate-500 dark:text-slate-400" />}
                                    {status}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                    </div>
                    <button
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 font-medium transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                    >
                        <Plus size={18} className="mr-2" />
                        Grant Access
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Access Granted</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary font-bold mr-3 border border-slate-200 dark:border-slate-600">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                                                    <div className="text-slate-500 dark:text-slate-400 text-xs">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                {getStatusIcon(user.status)}
                                                <span className="ml-1">{user.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{user.grantedAt}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative inline-block" ref={openMenuId === user.id ? menuRef : undefined}>
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                                    aria-label="User actions"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                                {openMenuId === user.id && (
                                                    <div className="absolute right-0 mt-1 w-48 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-20">
                                                        {user.status === 'Revoked' ? (
                                                            <button
                                                                onClick={() => handleRestoreAccess(user)}
                                                                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                                                            >
                                                                <UserCheck size={16} className="mr-2 text-green-600" />
                                                                Restore Access
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleRevokeAccess(user)}
                                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            >
                                                                <Ban size={16} className="mr-2" />
                                                                Revoke Access
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteUser(user)}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash2 size={16} className="mr-2" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No dashboard users found. Grant access to add users.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isAddUserModalOpen && (
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
                            onClick={() => setIsAddUserModalOpen(false)}
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
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Grant Dashboard Access</h2>
                                <button
                                    onClick={() => setIsAddUserModalOpen(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                        placeholder="user@example.com"
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name (optional)</label>
                                    <input
                                        type="text"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        placeholder="Leave blank to use email prefix"
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Set Password *</label>
                                    <input
                                        type="text"
                                        value={newUserPassword}
                                        onChange={(e) => setNewUserPassword(e.target.value)}
                                        placeholder="Min 8 characters"
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        minLength={8}
                                        required
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddUserModalOpen(false)}
                                        className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                                    >
                                        Grant Access
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
