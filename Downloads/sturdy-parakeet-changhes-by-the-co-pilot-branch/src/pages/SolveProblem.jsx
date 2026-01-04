import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Play, RotateCcw, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LANGUAGE_VERSIONS = {
    python: '3.10.0',
    java: '15.0.2',
    c: '10.2.0',
    cpp: '10.2.0',
};

const BOILERPLATES = {
    python: `def solution():\n    print("Hello from Python!")\n\nsolution()`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`,
};

const SolveProblem = () => {
    const { id } = useParams();
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState(BOILERPLATES.python);
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setCode(BOILERPLATES[newLang]);
        setOutput(null);
        setIsError(false);
    };

    const runCode = async () => {
        setIsLoading(true);
        setOutput(null);
        setIsError(false);

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: language,
                version: LANGUAGE_VERSIONS[language],
                files: [
                    {
                        content: code,
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
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
            {/* Problem Description Panel */}
            <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-xl flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Problem {id}: Two Sum</h2>
                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 font-medium">
                            Easy
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 mb-4">
                            Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
                        </p>
                        <p className="text-gray-300 mb-4">
                            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                        </p>

                        <h3 className="text-lg font-bold mt-6 mb-2">Example 1:</h3>
                        <div className="bg-black/30 p-4 rounded-lg font-mono text-sm mb-4 border border-white/5">
                            <p><span className="text-blue-400">Input:</span> nums = [2,7,11,15], target = 9</p>
                            <p><span className="text-green-400">Output:</span> [0,1]</p>
                            <p><span className="text-gray-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                        </div>

                        <h3 className="text-lg font-bold mt-6 mb-2">Constraints:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>2 &lt;= nums.length &lt;= 10^4</li>
                            <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                            <li>-10^9 &lt;= target &lt;= 10^9</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Code Editor Panel */}
            <div className="lg:w-2/3 flex flex-col gap-4">
                <div className="glass-panel p-2 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2 px-2">
                        <select
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary cursor-pointer"
                        >
                            <option value="python">Python (3.10)</option>
                            <option value="java">Java (15.0)</option>
                            <option value="c">C (GCC 10.2)</option>
                            <option value="cpp">C++ (GCC 10.2)</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCode(BOILERPLATES[language])}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            title="Reset Code"
                        >
                            <RotateCcw size={18} />
                        </button>
                        <button
                            onClick={runCode}
                            disabled={isLoading}
                            className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                            <span>Run Code</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 glass-panel rounded-xl overflow-hidden border border-white/10 relative group">
                    <Editor
                        height="100%"
                        language={language === 'c' || language === 'cpp' ? 'cpp' : language}
                        value={code}
                        onChange={(value) => setCode(value)}
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
                <motion.div
                    initial={{ height: '150px' }}
                    animate={{ height: output !== null ? '200px' : '48px' }}
                    className="glass-panel rounded-xl overflow-hidden flex flex-col"
                >
                    <div className="px-4 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-300">Console Output</span>
                        {output !== null && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {isError ? 'Error' : 'Success'}
                            </span>
                        )}
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-black/40">
                        {output ? (
                            <pre className={isError ? 'text-red-400' : 'text-gray-300'}>{output}</pre>
                        ) : (
                            <div className="text-gray-500 italic">Run your code to see output here...</div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SolveProblem;
