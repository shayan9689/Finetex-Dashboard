"use client";

import { User, Bell, Lock, Globe, Moon, Shield } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and application settings.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">

                {/* Profile Section */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <User className="mr-2 text-primary" size={20} />
                        Profile Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Admin User"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue="admin@fintex.com"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <Bell className="mr-2 text-primary" size={20} />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900">Email Notifications</p>
                                <p className="text-sm text-slate-500">Receive weekly reports and alerts.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900">Push Notifications</p>
                                <p className="text-sm text-slate-500">Receive real-time alerts on your device.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <Lock className="mr-2 text-primary" size={20} />
                        Security
                    </h2>
                    <button className="text-primary hover:text-primary-dark font-medium text-sm">Change Password</button>
                </div>

                {/* Appearance */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <Moon className="mr-2 text-primary" size={20} />
                        Appearance
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900">Dark Mode</p>
                            <p className="text-sm text-slate-500">Switch between light and dark themes.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <div className="p-6 bg-slate-50 flex justify-end rounded-b-2xl">
                    <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
