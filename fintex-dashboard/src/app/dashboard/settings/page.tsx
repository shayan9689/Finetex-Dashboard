"use client";

import { User, Bell, Lock, Moon, X, Pencil, Check, Eye, EyeOff, Users } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileName, setProfileName] = useState('Admin User');
    const [profileEmail, setProfileEmail] = useState('admin@fintex.com');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedPasswordField, setFocusedPasswordField] = useState<'current' | 'new' | 'confirm' | null>(null);

    const handleProfileSave = () => {
        setIsEditingProfile(false);
    };

    const closePasswordModal = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setFocusedPasswordField(null);
        setIsPasswordModalOpen(false);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters.');
            return;
        }
        // Simulate save
        closePasswordModal();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6 max-w-4xl mx-auto"
        >
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and application settings.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden">

                {/* Profile Section - Login Details Container */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                        <User className="mr-2 text-primary" size={20} />
                        Profile Information
                    </h2>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-4 md:p-5 overflow-hidden">
                        <AnimatePresence mode="wait">
                        {!isEditingProfile ? (
                            <motion.div
                                key="view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                    <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white text-xl font-bold">
                                                A
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Username</p>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">{profileName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</p>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">{profileEmail}</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-start">
                                        <a
                                            href="/dashboard/manage-users"
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            <Users size={16} />
                                            Manage Users
                                        </a>
                                        <button
                                            onClick={() => setIsEditingProfile(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>
                                    </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="edit"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="space-y-4"
                            >
                                {/* Profile Picture - editable, pencil next to pic on right */}
                                <div className="flex flex-col items-start gap-3">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Profile Picture</label>
                                    <label
                                        htmlFor="profile-pic-upload"
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600 ring-offset-2 dark:ring-offset-slate-800 group-hover:ring-primary/50 transition-all flex-shrink-0">
                                            {profileImage ? (
                                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
                                                    A
                                                </div>
                                            )}
                                        </div>
                                        <Pencil size={20} className="text-slate-900 dark:text-slate-100" />
                                        <input
                                            id="profile-pic-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = () => setProfileImage(reader.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                                    <input
                                        type="text"
                                        value={profileName}
                                        onChange={(e) => setProfileName(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileEmail}
                                        onChange={(e) => setProfileEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile(false)}
                                        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleProfileSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                                    >
                                        <Check size={16} />
                                        Save
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Notifications */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                        <Bell className="mr-2 text-primary" size={20} />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">Email Notifications</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Receive weekly reports and alerts.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">Push Notifications</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Receive real-time alerts on your device.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                        <Lock className="mr-2 text-primary" size={20} />
                        Security
                    </h2>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                    >
                        Change Password
                    </button>
                </div>

                {/* Appearance */}
                <div className="p-6 rounded-b-2xl">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                        <Moon className="mr-2 text-primary" size={20} />
                        Appearance
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Dark Mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes.</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={theme === 'dark'}
                            onClick={toggleTheme}
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-slate-200 dark:bg-slate-600 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20"
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <AnimatePresence>
            {isPasswordModalOpen && (
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
                        onClick={closePasswordModal}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Change Password</h2>
                            <button
                                onClick={closePasswordModal}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        onFocus={() => setFocusedPasswordField('current')}
                                        onBlur={() => setFocusedPasswordField(null)}
                                        required
                                        className={`w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${focusedPasswordField === 'current' ? 'pr-10' : ''}`}
                                        placeholder=""
                                    />
                                    {focusedPasswordField === 'current' && (
                                        <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onFocus={() => setFocusedPasswordField('new')}
                                        onBlur={() => setFocusedPasswordField(null)}
                                        required
                                        minLength={8}
                                        className={`w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${focusedPasswordField === 'new' ? 'pr-10' : ''}`}
                                        placeholder=""
                                    />
                                    {focusedPasswordField === 'new' && (
                                        <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onFocus={() => setFocusedPasswordField('confirm')}
                                        onBlur={() => setFocusedPasswordField(null)}
                                        required
                                        className={`w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${focusedPasswordField === 'confirm' ? 'pr-10' : ''}`}
                                        placeholder=""
                                    />
                                    {focusedPasswordField === 'confirm' && (
                                        <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:opacity-95"
                                >
                                    Update Password
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
