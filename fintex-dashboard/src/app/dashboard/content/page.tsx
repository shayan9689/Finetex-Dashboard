"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    X,
    ChevronDown,
    Trash2,
    Edit3,
    Eye,
    LayoutGrid
} from 'lucide-react';

type Topic = { id: string; title: string; description: string };
type QuizOption = { id: string; text: string; isCorrect: boolean };
type QuizQuestion = { id: string; question: string; options: QuizOption[] };
type PracticalExample = { id: string; example: string; solution: string };

type Lesson = {
    id: number;
    title: string;
    unit: string;
    type: string;
    duration: string;
    status: string;
    completions: number;
    lessonNumber?: number;
    topics?: Topic[];
    quizQuestions?: QuizQuestion[];
    practicalExamples?: PracticalExample[];
};

const initialLessons: Lesson[] = [
    {
        id: 1,
        title: 'Introduction to Budgeting',
        unit: 'Unit 1: Basics',
        type: 'Video',
        duration: '5 mins',
        status: 'Published',
        completions: 1245,
        lessonNumber: 1,
        topics: [
            { id: 't1', title: 'What is a Budget?', description: 'A budget is a plan that helps you manage your money by tracking income and expenses.' },
            { id: 't2', title: 'Why Budget?', description: 'Budgeting helps you avoid overspending, save for goals, and reduce financial stress.' }
        ],
        quizQuestions: [
            {
                id: 'q1',
                question: 'What is the primary purpose of a budget?',
                options: [
                    { id: 'o1', text: 'To limit your spending', isCorrect: false },
                    { id: 'o2', text: 'To plan and track income and expenses', isCorrect: true },
                    { id: 'o3', text: 'To save money only', isCorrect: false }
                ]
            }
        ],
        practicalExamples: [
            { id: 'e1', example: 'Create a monthly budget for a $3000 income', solution: 'Allocate 50% to needs ($1500), 30% to wants ($900), 20% to savings ($600).' }
        ]
    },
    {
        id: 2,
        title: 'Understanding Needs vs Wants',
        unit: 'Unit 1: Basics',
        type: 'Article',
        duration: '3 mins',
        status: 'Published',
        completions: 1100,
        lessonNumber: 2,
        topics: [
            { id: 't1', title: 'Definition of Needs', description: 'Needs are essentials: housing, food, utilities, healthcare, and transportation.' },
            { id: 't2', title: 'Definition of Wants', description: 'Wants are non-essentials that improve quality of life but are not necessary for survival.' }
        ],
        quizQuestions: [
            {
                id: 'q1',
                question: 'Which of these is typically a need?',
                options: [
                    { id: 'o1', text: 'Streaming subscription', isCorrect: false },
                    { id: 'o2', text: 'Groceries', isCorrect: true },
                    { id: 'o3', text: 'New smartphone', isCorrect: false }
                ]
            }
        ],
        practicalExamples: [
            { id: 'e1', example: 'Categorize: Rent, Netflix, Medicine, Concert tickets', solution: 'Needs: Rent, Medicine. Wants: Netflix, Concert tickets.' }
        ]
    },
    {
        id: 3,
        title: 'Smart Goals for Finance',
        unit: 'Unit 1: Basics',
        type: 'Quiz',
        duration: '10 mins',
        status: 'Draft',
        completions: 0,
        lessonNumber: 3,
        topics: [
            { id: 't1', title: 'SMART Framework', description: 'Specific, Measurable, Achievable, Relevant, Time-bound goals for better financial planning.' }
        ],
        quizQuestions: [
            {
                id: 'q1',
                question: 'What does the S in SMART stand for?',
                options: [
                    { id: 'o1', text: 'Simple', isCorrect: false },
                    { id: 'o2', text: 'Specific', isCorrect: true },
                    { id: 'o3', text: 'Savings', isCorrect: false }
                ]
            }
        ],
        practicalExamples: [
            { id: 'e1', example: 'Convert "save money" to a SMART goal', solution: 'Save $500/month for emergency fund over 12 months to reach $6000.' }
        ]
    },
    {
        id: 4,
        title: 'Compound Interest Explained',
        unit: 'Unit 2: Saving',
        type: 'Video',
        duration: '8 mins',
        status: 'Published',
        completions: 850,
        lessonNumber: 4,
        topics: [
            { id: 't1', title: 'What is Compound Interest?', description: 'Interest earned on both the principal and accumulated interest over time.' },
            { id: 't2', title: 'The Power of Time', description: 'The longer you invest, the more compound interest works in your favor.' }
        ],
        quizQuestions: [],
        practicalExamples: []
    },
    {
        id: 5,
        title: 'Emergency Funds 101',
        unit: 'Unit 2: Saving',
        type: 'Article',
        duration: '4 mins',
        status: 'Review',
        completions: 50,
        lessonNumber: 5,
        topics: [],
        quizQuestions: [],
        practicalExamples: []
    },
    {
        id: 6,
        title: 'Debt Snowball Method',
        unit: 'Unit 3: Debt',
        type: 'Interactive',
        duration: '12 mins',
        status: 'Published',
        completions: 620,
        lessonNumber: 6,
        topics: [],
        quizQuestions: [],
        practicalExamples: []
    },
    {
        id: 7,
        title: 'Credit Score Factors',
        unit: 'Unit 3: Debt',
        type: 'Video',
        duration: '6 mins',
        status: 'Scheduled',
        completions: 0,
        lessonNumber: 7,
        topics: [],
        quizQuestions: [],
        practicalExamples: []
    }
];

const generateId = () => Math.random().toString(36).slice(2, 11);

export default function ContentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [openActionsId, setOpenActionsId] = useState<number | null>(null);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Create Lesson form state
    const [newLesson, setNewLesson] = useState({
        title: '',
        unit: '',
        type: 'Article',
        duration: '',
        content: '',
        topics: [] as Topic[],
        quizQuestions: [] as QuizQuestion[],
        practicalExamples: [] as PracticalExample[]
    });

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.unit.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'All' || lesson.type === filterType;
        return matchesSearch && matchesFilter;
    });

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (openActionsId !== null && actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
                setOpenActionsId(null);
            }
            if (filterDropdownOpen && filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openActionsId, filterDropdownOpen]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video': return <PlayCircle size={18} className="text-rose-600 dark:text-rose-400" />;
            case 'Article': return <FileText size={18} className="text-sky-600 dark:text-sky-400" />;
            case 'Quiz': return <HelpCircle size={18} className="text-amber-600 dark:text-amber-400" />;
            case 'Interactive': return <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" />;
            default: return <BookOpen size={18} className="text-violet-600 dark:text-violet-400" />;
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

    const openLessonDetail = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setIsDetailModalOpen(true);
        setOpenActionsId(null);
    };

    const handleDeleteLesson = (id: number) => {
        setLessons(prev => prev.filter(l => l.id !== id));
        setOpenActionsId(null);
        if (selectedLesson?.id === id) {
            setIsDetailModalOpen(false);
            setSelectedLesson(null);
        }
    };

    const resetCreateForm = () => {
        setNewLesson({
            title: '',
            unit: '',
            type: 'Article',
            duration: '',
            content: '',
            topics: [],
            quizQuestions: [],
            practicalExamples: []
        });
    };

    const addTopic = () => {
        setNewLesson(prev => ({
            ...prev,
            topics: [...prev.topics, { id: generateId(), title: '', description: '' }]
        }));
    };

    const updateTopic = (id: string, field: 'title' | 'description', value: string) => {
        setNewLesson(prev => ({
            ...prev,
            topics: prev.topics.map(t => t.id === id ? { ...t, [field]: value } : t)
        }));
    };

    const removeTopic = (id: string) => {
        setNewLesson(prev => ({ ...prev, topics: prev.topics.filter(t => t.id !== id) }));
    };

    const addQuizQuestion = () => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: [...prev.quizQuestions, {
                id: generateId(),
                question: '',
                options: [
                    { id: generateId(), text: '', isCorrect: false },
                    { id: generateId(), text: '', isCorrect: false }
                ]
            }]
        }));
    };

    const updateQuizQuestion = (qId: string, field: 'question', value: string) => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: prev.quizQuestions.map(q =>
                q.id === qId ? { ...q, [field]: value } : q
            )
        }));
    };

    const updateQuizOption = (qId: string, oId: string, text: string) => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: prev.quizQuestions.map(q => {
                if (q.id !== qId) return q;
                return { ...q, options: q.options.map(o => o.id === oId ? { ...o, text } : o) };
            })
        }));
    };

    const setCorrectOption = (qId: string, oId: string) => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: prev.quizQuestions.map(q =>
                q.id === qId
                    ? { ...q, options: q.options.map(o => ({ ...o, isCorrect: o.id === oId })) }
                    : q
            )
        }));
    };

    const addQuizOption = (qId: string) => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: prev.quizQuestions.map(q =>
                q.id === qId
                    ? { ...q, options: [...q.options, { id: generateId(), text: '', isCorrect: false }] }
                    : q
            )
        }));
    };

    const removeQuizOption = (qId: string, oId: string) => {
        setNewLesson(prev => ({
            ...prev,
            quizQuestions: prev.quizQuestions.map(q =>
                q.id === qId ? { ...q, options: q.options.filter(o => o.id !== oId) } : q
            )
        }));
    };

    const removeQuizQuestion = (qId: string) => {
        setNewLesson(prev => ({ ...prev, quizQuestions: prev.quizQuestions.filter(q => q.id !== qId) }));
    };

    const addPracticalExample = () => {
        setNewLesson(prev => ({
            ...prev,
            practicalExamples: [...prev.practicalExamples, { id: generateId(), example: '', solution: '' }]
        }));
    };

    const updatePracticalExample = (id: string, field: 'example' | 'solution', value: string) => {
        setNewLesson(prev => ({
            ...prev,
            practicalExamples: prev.practicalExamples.map(e =>
                e.id === id ? { ...e, [field]: value } : e
            )
        }));
    };

    const removePracticalExample = (id: string) => {
        setNewLesson(prev => ({ ...prev, practicalExamples: prev.practicalExamples.filter(e => e.id !== id) }));
    };

    const handleCreateLesson = () => {
        const maxId = Math.max(...lessons.map(l => l.id), 0);
        const lessonNumber = lessons.length + 1;
        const newLessonData: Lesson = {
            id: maxId + 1,
            title: newLesson.title || 'Untitled Lesson',
            unit: newLesson.unit || 'Unit 1: Basics',
            type: newLesson.type,
            duration: newLesson.duration || '5 mins',
            status: 'Draft',
            completions: 0,
            lessonNumber,
            topics: newLesson.topics,
            quizQuestions: newLesson.quizQuestions,
            practicalExamples: newLesson.practicalExamples
        };
        setLessons(prev => [...prev, newLessonData]);
        setIsCreateModalOpen(false);
        resetCreateForm();
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Content Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Create and manage lessons, quizzes, and learning resources.</p>
                </div>
                <div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 font-medium transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                    >
                        <Plus size={18} className="mr-2" />
                        Create New Lesson
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search lessons or units..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${filterType !== 'All'
                            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/30 hover:opacity-95'
                            : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                        }`}
                    >
                        {filterType !== 'All' ? getTypeIcon(filterType) : <Filter size={18} />}
                        <span className="text-sm font-medium">{filterType}</span>
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
                                {['All', 'Video', 'Article', 'Quiz', 'Interactive'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setFilterType(type);
                                            setFilterDropdownOpen(false);
                                        }}
                                        className={`w-full flex justify-start items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                                            filterType === type
                                                ? 'mx-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white'
                                                : 'mx-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {type !== 'All' ? getTypeIcon(type) : <LayoutGrid size={16} className="text-slate-500 dark:text-slate-400" />}
                                        {type}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Stats Cards - Total Lessons only (Published removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-primary">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Total Lessons</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{lessons.length}</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Avg Duration</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">5.2m</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600">
                        <PlayCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Total Views</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">45.2k</h3>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-700">
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
                                    <tr
                                        key={lesson.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                        onClick={() => openLessonDetail(lesson)}
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                            {lesson.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {lesson.unit}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                {getTypeIcon(lesson.type)}
                                                <span>{lesson.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {lesson.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                                                {lesson.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            {lesson.completions.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                            <div className="relative inline-block" ref={openActionsId === lesson.id ? actionsRef : undefined}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenActionsId(openActionsId === lesson.id ? null : lesson.id);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                                {openActionsId === lesson.id && (
                                                    <div className="absolute right-0 top-full mt-1 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-20 min-w-[140px]">
                                                        <button
                                                            onClick={() => openLessonDetail(lesson)}
                                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                                                        >
                                                            <Eye size={16} /> View
                                                        </button>
                                                        <button
                                                            onClick={() => { openLessonDetail(lesson); setOpenActionsId(null); }}
                                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                                                        >
                                                            <Edit3 size={16} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this lesson?')) handleDeleteLesson(lesson.id);
                                                            }}
                                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                                                        >
                                                            <Trash2 size={16} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No lessons found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lesson Detail Modal */}
            <AnimatePresence>
            {isDetailModalOpen && selectedLesson && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm"
                        onClick={() => setIsDetailModalOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedLesson.title}</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                    Lesson {selectedLesson.lessonNumber ?? selectedLesson.id} • {selectedLesson.unit} • {selectedLesson.type}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {/* Topics */}
                            {selectedLesson.topics && selectedLesson.topics.length > 0 && (
                                <section>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase mb-3">Topics</h3>
                                    <div className="space-y-4">
                                        {selectedLesson.topics.map((topic, idx) => (
                                            <div key={topic.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                                <h4 className="font-medium text-slate-900 dark:text-slate-100">Topic {idx + 1}: {topic.title}</h4>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{topic.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Quiz Questions */}
                            {selectedLesson.quizQuestions && selectedLesson.quizQuestions.length > 0 && (
                                <section>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase mb-3">Quiz Questions</h3>
                                    <div className="space-y-4">
                                        {selectedLesson.quizQuestions.map((q, idx) => (
                                            <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                                <h4 className="font-medium text-slate-900 dark:text-slate-100">Question {idx + 1}: {q.question}</h4>
                                                <ul className="mt-2 space-y-1">
                                                    {q.options.map((opt) => (
                                                        <li key={opt.id} className="text-sm text-slate-600 flex items-center gap-2">
                                                            <span className={opt.isCorrect ? 'text-green-600 font-medium' : ''}>
                                                                • {opt.text}
                                                                {opt.isCorrect && ' (Correct)'}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Practical Examples */}
                            {selectedLesson.practicalExamples && selectedLesson.practicalExamples.length > 0 && (
                                <section>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase mb-3">Practical Examples</h3>
                                    <div className="space-y-4">
                                        {selectedLesson.practicalExamples.map((ex, idx) => (
                                            <div key={ex.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                                <h4 className="font-medium text-slate-900 dark:text-slate-100">Example {idx + 1}: {ex.example}</h4>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2"><strong>Solution:</strong> {ex.solution}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {(!selectedLesson.topics?.length && !selectedLesson.quizQuestions?.length && !selectedLesson.practicalExamples?.length) && (
                                <p className="text-slate-500 dark:text-slate-400 text-center py-8">No additional content for this lesson yet.</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Create New Lesson Modal */}
            <AnimatePresence>
            {isCreateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm"
                        onClick={() => { setIsCreateModalOpen(false); resetCreateForm(); }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Create New Lesson</h2>
                            <button
                                onClick={() => { setIsCreateModalOpen(false); resetCreateForm(); }}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={newLesson.title}
                                        onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Lesson title"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                                    <input
                                        type="text"
                                        value={newLesson.unit}
                                        onChange={(e) => setNewLesson(prev => ({ ...prev, unit: e.target.value }))}
                                        placeholder="Unit 1: Basics"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <select
                                        value={newLesson.type}
                                        onChange={(e) => setNewLesson(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    >
                                        <option value="Article">Article</option>
                                        <option value="Video">Video</option>
                                        <option value="Quiz">Quiz</option>
                                        <option value="Interactive">Interactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={newLesson.duration}
                                        onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                                        placeholder="5 mins"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Lesson Content (text area for content upload) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Content</label>
                                <textarea
                                    rows={3}
                                    value={newLesson.content}
                                    placeholder="Paste or type lesson content here..."
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    onChange={(e) => setNewLesson(prev => ({ ...prev, content: e.target.value }))}
                                />
                            </div>

                            {/* Topics */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Topics</label>
                                    <button
                                        type="button"
                                        onClick={addTopic}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        + Add Topic
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {newLesson.topics.map((topic, idx) => (
                                        <div key={topic.id} className="p-4 border border-slate-200 rounded-xl space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Topic {idx + 1}</span>
                                                <button onClick={() => removeTopic(topic.id)} className="text-red-500 hover:text-red-600 text-sm">Remove</button>
                                            </div>
                                            <input
                                                type="text"
                                                value={topic.title}
                                                onChange={(e) => updateTopic(topic.id, 'title', e.target.value)}
                                                placeholder="Topic title"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                            <textarea
                                                rows={2}
                                                value={topic.description}
                                                onChange={(e) => updateTopic(topic.id, 'description', e.target.value)}
                                                placeholder="Description"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quiz Questions */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Quiz Questions</label>
                                    <button
                                        type="button"
                                        onClick={addQuizQuestion}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        + Add Question
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {newLesson.quizQuestions.map((q, qIdx) => (
                                        <div key={q.id} className="p-4 border border-slate-200 rounded-xl space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Question {qIdx + 1}</span>
                                                <button onClick={() => removeQuizQuestion(q.id)} className="text-red-500 hover:text-red-600 text-sm">Remove</button>
                                            </div>
                                            <input
                                                type="text"
                                                value={q.question}
                                                onChange={(e) => updateQuizQuestion(q.id, 'question', e.target.value)}
                                                placeholder="Enter question"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                            <div className="space-y-2">
                                                {q.options.map((opt, oIdx) => (
                                                    <div key={opt.id} className="flex gap-2 items-center">
                                                        <input
                                                            type="radio"
                                                            name={`correct-${q.id}`}
                                                            checked={opt.isCorrect}
                                                            onChange={() => setCorrectOption(q.id, opt.id)}
                                                            className="text-primary"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={opt.text}
                                                            onChange={(e) => updateQuizOption(q.id, opt.id, e.target.value)}
                                                            placeholder={`Option ${oIdx + 1}`}
                                                            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                        />
                                                        {q.options.length > 2 && (
                                                            <button onClick={() => removeQuizOption(q.id, opt.id)} className="text-red-500 hover:text-red-600 p-1">×</button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addQuizOption(q.id)}
                                                    className="text-xs text-primary hover:underline"
                                                >
                                                    + Add Option
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Practical Examples */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Practical Examples</label>
                                    <button
                                        type="button"
                                        onClick={addPracticalExample}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        + Add Example
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {newLesson.practicalExamples.map((ex, idx) => (
                                        <div key={ex.id} className="p-4 border border-slate-200 rounded-xl space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Example {idx + 1}</span>
                                                <button onClick={() => removePracticalExample(ex.id)} className="text-red-500 hover:text-red-600 text-sm">Remove</button>
                                            </div>
                                            <input
                                                type="text"
                                                value={ex.example}
                                                onChange={(e) => updatePracticalExample(ex.id, 'example', e.target.value)}
                                                placeholder="Example prompt"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                            <textarea
                                                rows={2}
                                                value={ex.solution}
                                                onChange={(e) => updatePracticalExample(ex.id, 'solution', e.target.value)}
                                                placeholder="Solution"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                            <button
                                onClick={() => { setIsCreateModalOpen(false); resetCreateForm(); }}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateLesson}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl font-medium transition-all hover:opacity-95"
                            >
                                Create Lesson
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
}
