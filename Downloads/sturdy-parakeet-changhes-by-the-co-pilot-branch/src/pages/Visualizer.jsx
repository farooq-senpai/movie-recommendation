import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Visualizer = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [activeIndices, setActiveIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 20; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 10);
        }
        setArray(newArray);
        setSortedIndices([]);
        setActiveIndices([]);
    };

    const bubbleSort = async () => {
        setIsSorting(true);
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await new Promise((resolve) => setTimeout(resolve, 100));

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                }
            }
            setSortedIndices((prev) => [...prev, n - i - 1]);
        }
        setSortedIndices((prev) => [...prev, 0]);
        setActiveIndices([]);
        setIsSorting(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Algorithm Visualizer</h2>
                    <p className="text-gray-400">Visualize algorithms in real-time.</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={resetArray}
                        disabled={isSorting}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium flex items-center space-x-2 transition-all disabled:opacity-50"
                    >
                        <RotateCcw size={18} />
                        <span>Reset</span>
                    </button>
                    <button
                        onClick={bubbleSort}
                        disabled={isSorting}
                        className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                    >
                        <Play size={18} />
                        <span>Start Bubble Sort</span>
                    </button>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-xl h-[500px] flex items-end justify-center gap-2 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 opacity-10 pointer-events-none">
                    {[...Array(72)].map((_, i) => (
                        <div key={i} className="border border-white/20 rounded-sm"></div>
                    ))}
                </div>

                {array.map((value, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        initial={{ height: 0 }}
                        animate={{
                            height: `${value * 3}px`,
                            backgroundColor: activeIndices.includes(idx)
                                ? 'hsl(var(--accent))'
                                : sortedIndices.includes(idx)
                                    ? 'hsl(var(--secondary))'
                                    : 'hsl(var(--primary))'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-8 rounded-t-md relative group"
                    >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {value}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <BarChart2 size={20} className="text-primary" />
                        Complexity Analysis
                    </h3>
                    <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex justify-between">
                            <span>Time Complexity (Best)</span>
                            <span className="text-green-400 font-mono">O(n)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time Complexity (Average)</span>
                            <span className="text-orange-400 font-mono">O(n²)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time Complexity (Worst)</span>
                            <span className="text-red-400 font-mono">O(n²)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Space Complexity</span>
                            <span className="text-blue-400 font-mono">O(1)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visualizer;
