import React from 'react';
import { Code, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', submissions: 120, status: 'Active' },
    { id: 2, title: 'Reverse Linked List', difficulty: 'Medium', submissions: 85, status: 'Active' },
    { id: 3, title: 'Merge K Sorted Lists', difficulty: 'Hard', submissions: 42, status: 'Draft' },
    { id: 4, title: 'Valid Palindrome', difficulty: 'Easy', submissions: 150, status: 'Active' },
    { id: 5, title: 'LRU Cache', difficulty: 'Medium', submissions: 60, status: 'Active' },
];

const ProblemList = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Problem Bank</h2>
                    <p className="text-gray-400">Manage and view all assigned DSA problems.</p>
                </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-300">Problem</th>
                                <th className="px-6 py-4 font-medium text-gray-300">Difficulty</th>
                                <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-300">Submissions</th>
                                <th className="px-6 py-4 font-medium text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <motion.tr
                                    key={problem.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                                <Code size={18} />
                                            </div>
                                            <span className="font-medium group-hover:text-blue-400 transition-colors">
                                                {problem.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : problem.difficulty === 'Medium'
                                                        ? 'bg-orange-500/20 text-orange-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            {problem.status === 'Active' ? (
                                                <CheckCircle size={14} className="text-green-400" />
                                            ) : (
                                                <Clock size={14} className="text-gray-400" />
                                            )}
                                            <span className="text-sm text-gray-300">{problem.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{problem.submissions}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/solve/${problem.id}`}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white inline-block"
                                        >
                                            <ChevronRight size={18} />
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;
