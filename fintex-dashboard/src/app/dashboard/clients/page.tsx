"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trash2,
    UserCheck,
    ChevronDown,
    LayoutGrid
} from 'lucide-react';

const initialClients = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2023-10-15', avatar: 'A' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Student', plan: 'Free', status: 'Inactive', joined: '2023-11-02', avatar: 'B' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2023-09-20', avatar: 'C' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Student', plan: 'Free', status: 'Suspended', joined: '2023-12-05', avatar: 'D' },
    { id: 5, name: 'Fiona Green', email: 'fiona@example.com', role: 'Student', plan: 'Premium', status: 'Active', joined: '2024-01-12', avatar: 'F' },
    { id: 6, name: 'George Harris', email: 'george@example.com', role: 'Student', plan: 'Free', status: 'Active', joined: '2024-02-01', avatar: 'G' },
];

const STATUS_OPTIONS = ['All', 'Active', 'Inactive', 'Suspended'] as const;

type Client = {
    id: number;
    name: string;
    email: string;
    role: string;
    plan: string;
    status: string;
    joined: string;
    avatar: string;
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
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

    const handleDeleteClient = (client: Client) => {
        if (confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
            setClients(prev => prev.filter(c => c.id !== client.id));
            setOpenMenuId(null);
        }
    };

    const handleSuspendClient = (client: Client) => {
        const action = client.status === 'Suspended' ? 'unsuspend' : 'suspend';
        if (confirm(`Are you sure you want to ${action} ${client.name}?`)) {
            setClients(prev => prev.map(c =>
                c.id === client.id
                    ? { ...c, status: c.status === 'Suspended' ? 'Active' : 'Suspended' }
                    : c
            ));
            setOpenMenuId(null);
        }
    };

    const handleExport = () => {
        const headers = ['Name', 'Email', 'Role', 'Plan', 'Status', 'Joined'];
        const csvRows = [
            headers.join(','),
            ...filteredClients.map(client =>
                [client.name, client.email, client.role, client.plan, client.status, client.joined]
                    .map(field => `"${String(field).replace(/"/g, '""')}"`)
                    .join(',')
            )
        ];
        const csv = csvRows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `clients-export-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || client.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
            case 'Inactive': return <XCircle size={16} className="text-slate-500 dark:text-slate-400" />;
            case 'Suspended': return <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />;
            default: return <LayoutGrid size={16} className="text-slate-500 dark:text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Inactive': return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
            case 'Suspended': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
        }
    };

    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'Premium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Team': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Clients</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your client base, plans, and account status.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                    <Download size={18} className="mr-2" />
                    Export
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

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
                                className="absolute right-0 mt-2 py-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-20"
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
            </div>

            {/* Clients Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Subscription</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary font-bold mr-3 border border-slate-200 dark:border-slate-600">
                                                    {client.avatar}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-slate-100">{client.name}</div>
                                                    <div className="text-slate-500 dark:text-slate-400 text-xs">{client.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-700 dark:text-slate-300">{client.role}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(client.plan)}`}>
                                                {client.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                                                {getStatusIcon(client.status)}
                                                <span className="ml-1">{client.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{client.joined}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative inline-block" ref={openMenuId === client.id ? menuRef : undefined}>
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === client.id ? null : client.id)}
                                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                                    aria-label="Client actions"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                                {openMenuId === client.id && (
                                                    <div className="absolute right-0 mt-1 w-48 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-20">
                                                        <button
                                                            onClick={() => handleSuspendClient(client)}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                                                        >
                                                            {client.status === 'Suspended' ? (
                                                                <>
                                                                    <UserCheck size={16} className="mr-2 text-green-600" />
                                                                    Unsuspend
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <AlertCircle size={16} className="mr-2 text-amber-600" />
                                                                    Suspend
                                                                </>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClient(client)}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash2 size={16} className="mr-2" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No clients found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClients.length}</span> of <span className="font-medium">{clients.length}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed" disabled>Previous</button>
                        <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
