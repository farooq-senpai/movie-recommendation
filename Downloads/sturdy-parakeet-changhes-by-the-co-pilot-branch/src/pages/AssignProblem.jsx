import React, { useState } from 'react';
import { Save, Code, AlertCircle, Play, Loader2, RotateCcw } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { motion } from 'framer-motion';

const LANGUAGE_VERSIONS = {
    python: '3.10.0',
    java: '15.0.2',
    c: '10.2.0',
    cpp: '10.2.0',
};

const AssignProblem = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        language: 'python',
        template: `def solution(nums, target):\n    # Your code here\n    pass`,
    });

    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Problem submitted:', formData);
        alert('Problem created! (Mock)');
    };

    const runCode = async () => {
        setIsLoading(true);
        setOutput(null);
        setIsError(false);

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: formData.language,
                version: LANGUAGE_VERSIONS[formData.language],
                files: [
                    {
                        content: formData.template,
                    },
                ],
            });

            const { run } = response.data;
            setOutput(run.output);
            setIsError(run.stderr ? true : false);
        } catch (error) {
            console.error('Error executing code:', error);
            setOutput('Failed to execute code. Please try again.');
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Assign New Problem</h2>
                    <p className="text-gray-400">Create a new DSA challenge for your students.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
                >
                    <Save size={18} />
                    <span>Publish Assignment</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-xl space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Problem Title</label>
                            <input
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                placeholder="e.g., Two Sum"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors h-40"
                                placeholder="Describe the problem, input/output format, and constraints..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-300">Starter Code Template</label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={runCode}
                                        disabled={isLoading}
                                        className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-md text-xs font-medium flex items-center space-x-1 transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                                        <span>Test Run</span>
                                    </button>
                                </div>
                            </div>

                            <div className="border border-white/10 rounded-lg overflow-hidden h-80 relative group">
                                <Editor
                                    height="100%"
                                    language={formData.language === 'c' || formData.language === 'cpp' ? 'cpp' : formData.language}
                                    value={formData.template}
                                    onChange={(value) => setFormData({ ...formData, template: value })}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        padding: { top: 16 },
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>

                            {/* Output Console */}
                            {output !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 glass-panel rounded-lg overflow-hidden"
                                >
                                    <div className="px-4 py-2 border-b border-white/10 bg-black/20 flex items-center justify-between">
                                        <span className="font-medium text-xs text-gray-300">Test Output</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {isError ? 'Error' : 'Success'}
                                        </span>
                                    </div>
                                    <div className="p-4 font-mono text-sm overflow-auto bg-black/40 max-h-40">
                                        <pre className={isError ? 'text-red-400' : 'text-gray-300'}>{output}</pre>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-xl space-y-6">
                        <h3 className="font-bold text-lg border-b border-white/10 pb-4">Configuration</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Easy', 'Medium', 'Hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, difficulty: diff })}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${formData.difficulty === diff
                                                ? diff === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                                    : diff === 'Medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary appearance-none"
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            >
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>

                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start space-x-3">
                            <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={16} />
                            <p className="text-xs text-blue-200/80">
                                Students will be able to submit solutions in the selected language. Automated testing will run against your test cases.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignProblem;
