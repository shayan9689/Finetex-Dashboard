"use client";

import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    BookOpen,
    FileText,
    PlayCircle,
    HelpCircle,
    Clock,
    CheckCircle
} from 'lucide-react';

const lessons = [
    { id: 1, title: 'Introduction to Budgeting', unit: 'Unit 1: Basics', type: 'Video', duration: '5 mins', status: 'Published', completions: 1245 },
    { id: 2, title: 'Understanding Needs vs Wants', unit: 'Unit 1: Basics', type: 'Article', duration: '3 mins', status: 'Published', completions: 1100 },
    { id: 3, title: 'Smart Goals for Finance', unit: 'Unit 1: Basics', type: 'Quiz', duration: '10 mins', status: 'Draft', completions: 0 },
    { id: 4, title: 'Compound Interest Explained', unit: 'Unit 2: Saving', type: 'Video', duration: '8 mins', status: 'Published', completions: 850 },
    { id: 5, title: 'Emergency Funds 101', unit: 'Unit 2: Saving', type: 'Article', duration: '4 mins', status: 'Review', completions: 50 },
    { id: 6, title: 'Debt Snowball Method', unit: 'Unit 3: Debt', type: 'Interactive', duration: '12 mins', status: 'Published', completions: 620 },
    { id: 7, title: 'Credit Score Factors', unit: 'Unit 3: Debt', type: 'Video', duration: '6 mins', status: 'Scheduled', completions: 0 },
];

export default function ContentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.unit.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'All' || lesson.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video': return <PlayCircle size={18} className="text-blue-500" />;
            case 'Article': return <FileText size={18} className="text-orange-500" />;
            case 'Quiz': return <HelpCircle size={18} className="text-purple-500" />;
            default: return <BookOpen size={18} className="text-slate-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800';
            case 'Draft': return 'bg-slate-100 text-slate-800';
            case 'Review': return 'bg-amber-100 text-amber-800';
            case 'Scheduled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
                    <p className="text-slate-500 mt-1">Create and manage lessons, quizzes, and learning resources.</p>
                </div>
                <div>
                    <button className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/30 font-medium transition-colors">
                        <Plus size={18} className="mr-2" />
                        Create New Lesson
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
                        placeholder="Search lessons or units..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-500 font-medium mr-2">Filter by Type:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Video', 'Article', 'Quiz', 'Interactive'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterType === type
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-primary">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium uppercase">Total Lessons</p>
                        <h3 className="text-xl font-bold text-slate-900">142</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium uppercase">Published</p>
                        <h3 className="text-xl font-bold text-slate-900">128</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium uppercase">Avg Duration</p>
                        <h3 className="text-xl font-bold text-slate-900">5.2m</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <PlayCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium uppercase">Total Views</p>
                        <h3 className="text-xl font-bold text-slate-900">45.2k</h3>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Unit</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Completions</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLessons.length > 0 ? (
                                filteredLessons.map((lesson) => (
                                    <tr key={lesson.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {lesson.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {lesson.unit}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(lesson.type)}
                                                <span className="text-slate-700">{lesson.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {lesson.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                                                {lesson.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {lesson.completions.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        No lessons found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
