import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, User, Trash2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { sendMessageToAI } from '../services/aiService';

// --- Utility Components ---

const CodeBlock = ({ language, children }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-2 rounded-lg overflow-hidden border border-white/10">
            <div className="flex items-center justify-between px-3 py-1.5 bg-black/40 border-b border-white/10">
                <span className="text-xs text-gray-400 font-mono">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                    title="Copy code"
                >
                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                </button>
            </div>
            <SyntaxHighlighter
                language={language || 'javascript'}
                style={atomDark}
                customStyle={{ margin: 0, padding: '1rem', background: 'rgba(0,0,0,0.3)', fontSize: '0.85rem' }}
                wrapLines={true}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

const MessageBubble = ({ role, content, timestamp }) => {
    const isUser = role === 'user';

    // Simple parser for code blocks (```language ... ```)
    const renderContent = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```')) {
                const match = part.match(/```(\w*)\n([\s\S]*?)```/);
                const lang = match ? match[1] : '';
                const code = match ? match[2] : part.slice(3, -3);
                return <CodeBlock key={index} language={lang}>{code.trim()}</CodeBlock>;
            }
            return <p key={index} className="whitespace-pre-wrap mb-1 last:mb-0">{part}</p>;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex max-w-[90%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                {/* Avatar */}
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg
                    ${isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}
                `}>
                    {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`
                        px-4 py-3 shadow-md rounded-2xl text-sm leading-relaxed border
                        ${isUser
                            ? 'bg-primary text-white rounded-tr-sm border-blue-400/20'
                            : 'bg-zinc-800/80 backdrop-blur-sm text-gray-100 rounded-tl-sm border-white/10'
                        }
                    `}>
                        {renderContent(content)}
                    </div>
                    {/* Timestamp */}
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Component ---

const AISidebar = ({ isOpen, onClose }) => {
    // State
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('ai_chat_history');
        try {
            return saved ? JSON.parse(saved) : [{
                role: 'ai',
                content: 'Hello! I am your AI coding assistant. How can I help you with your algorithm problems today?',
                timestamp: new Date().toISOString()
            }];
        } catch (e) {
            return [];
        }
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Persistence
    useEffect(() => {
        localStorage.setItem('ai_chat_history', JSON.stringify(messages));
    }, [messages]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 300); // Small delay to wait for animation
            scrollToBottom();
        }
    }, [isOpen]);

    // Auto-scroll logic
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset to calculate new height
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Reset height immediately
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        try {
            // Include context (last 10 messages)
            const contextMessages = [...messages.slice(-10), userMsg];
            const response = await sendMessageToAI(contextMessages);

            setMessages(prev => [...prev, {
                ...response,
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Error: ${error.message}`,
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            const initialMsg = {
                role: 'ai',
                content: 'Chat history cleared. How can I help you now?',
                timestamp: new Date().toISOString()
            };
            setMessages([initialMsg]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0E0E11] border-l border-white/10 shadow-2xl z-50 flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md z-10">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary/20 p-2 rounded-lg">
                                <Sparkles className="text-primary" size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-[15px]">AI Assistant</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClear}
                                title="Clear Chat"
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                        {messages.map((msg, idx) => (
                            <MessageBubble
                                key={idx}
                                role={msg.role}
                                content={msg.content}
                                timestamp={msg.timestamp}
                            />
                        ))}

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start w-full mb-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                    <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center border border-white/5">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-[#0E0E11]/95 backdrop-blur">
                        <div className="relative bg-zinc-900/50 border border-white/10 rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all overflow-hidden">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about algorithms, code, or complexity..."
                                className="w-full bg-transparent text-sm text-gray-200 p-3 pr-12 max-h-32 resize-none focus:outline-none scrollbar-none"
                                rows={1}
                            />
                            {/* Clear Input Button */}
                            {input && (
                                <button
                                    onClick={() => { setInput(''); if (textareaRef.current) textareaRef.current.focus(); }}
                                    className="absolute right-10 bottom-3 text-gray-500 hover:text-white transition-colors"
                                    title="Clear Input"
                                >
                                    <X size={14} />
                                </button>
                            )}
                            <div className="absolute right-2 bottom-2">
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={`
                                        p-2 rounded-lg transition-all duration-200
                                        ${!input.trim() || isLoading
                                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                            : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                                        }
                                    `}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-[10px] text-gray-500 px-1">
                            <span>Markdown supported</span>
                            <span>{input.length} / 2000</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AISidebar;
