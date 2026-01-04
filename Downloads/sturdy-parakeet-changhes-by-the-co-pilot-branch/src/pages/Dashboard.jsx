import React from 'react';
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-panel p-6 rounded-xl relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className={`p-3 rounded-lg w-fit ${color} bg-opacity-20 mb-4`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <h3 className="text-3xl font-bold mb-1">{value}</h3>
            <p className="text-gray-400 text-sm">{label}</p>
        </div>
    </motion.div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, Instructor</h2>
                <p className="text-gray-400">Here's what's happening with your students today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Total Students" value="124" color="bg-blue-500 text-blue-400" />
                <StatCard icon={BookOpen} label="Active Assignments" value="12" color="bg-purple-500 text-purple-400" />
                <StatCard icon={CheckCircle} label="Submissions" value="843" color="bg-green-500 text-green-400" />
                <StatCard icon={Clock} label="Pending Review" value="28" color="bg-orange-500 text-orange-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                                        S{i}
                                    </div>
                                    <div>
                                        <p className="font-medium">Student {i} submitted "Binary Search"</p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                    Passed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-lg bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-left group">
                            <BookOpen className="mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-blue-100">New Assignment</p>
                            <p className="text-xs text-blue-300/70">Create a new problem</p>
                        </button>
                        <button className="p-4 rounded-lg bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition-all text-left group">
                            <Users className="mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-purple-100">Manage Students</p>
                            <p className="text-xs text-purple-300/70">View class roster</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
