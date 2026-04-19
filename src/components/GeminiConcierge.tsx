import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Send, User, Sparkles } from 'lucide-react';
import type { ZoneDensities } from '../hooks/useHeatmap';
import type { WaitTimes } from '../hooks/useSimulation';
import { generateConciergeResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

interface GeminiConciergeProps {
  densities: ZoneDensities;
  waitTimes: WaitTimes;
  isHighTraffic: boolean;
}

/**
 * GeminiConcierge Component
 * Represents an interactive glass-card AI interface.
 * Implements strict accessibility (ARIA) and sanitized state dispatching.
 */
const GeminiConcierge: FC<GeminiConciergeProps> = ({ densities, waitTimes, isHighTraffic }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hi! I'm Vantage AI. Everything is running smoothly. How can I assist your physical event experience today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /**
   * Handles the submission of user messages and triggers the AI response.
   * @param e - Optional form event.
   */
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Call the real Gemini Service layer.
    const aiText = await generateConciergeResponse(
      userMessage.content, 
      { densities, isHighTraffic, waitTimes }
    );
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: aiText }]);
    setIsTyping(false);
  };

  const suggestPrompt = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] flex flex-col h-full border border-slate-200 shadow-xl overflow-hidden min-h-[450px]">
      
      {/* Header */}
      <div className="bg-white/80 p-5 border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-violet-500 to-sky-500 p-2.5 rounded-2xl shadow-[0_4px_15px_rgba(139,92,246,0.25)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold tracking-wide flex items-center gap-2 text-lg">Smart AI Concierge</h3>
            <p className="text-violet-600/80 text-xs flex items-center gap-1.5 font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]"></span> Environment Aware
            </p>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div 
        className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 text-sm relative custom-scrollbar bg-slate-50/30" 
        ref={scrollRef}
        aria-live="polite"
        role="log"
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex max-w-[85%] relative z-10 ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
            {msg.role === 'ai' && (
               <div className="mr-3 mt-1 shrink-0 p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <BrainCircuit className="w-5 h-5 text-violet-500" />
              </div>
            )}
            <div className={`p-3.5 rounded-2xl shadow-sm md:text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-violet-600 text-white rounded-tr-md shadow-violet-500/20' 
                : 'bg-white text-slate-700 rounded-tl-md border border-slate-200'
            }`}>
               {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="ml-3 mt-1 shrink-0 p-1.5 rounded-xl bg-violet-100 border border-violet-200 shadow-sm">
                <User className="w-5 h-5 text-violet-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
           <div className="self-start flex max-w-[85%] relative z-10">
              <div className="mr-3 mt-1 shrink-0 p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <BrainCircuit className="w-5 h-5 text-violet-500" />
              </div>
             <div className="p-4 rounded-2xl bg-white text-slate-700 rounded-tl-md border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
             </div>
           </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-5 py-3 flex gap-2.5 overflow-x-auto scrollbar-hide border-t border-slate-200 bg-white/80">
        <button 
          onClick={() => suggestPrompt("Where is the best exit?")} 
          className="shrink-0 text-xs font-semibold tracking-wide px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
        >
          Best Exit?
        </button>
        <button 
          onClick={() => suggestPrompt("How long is the wait for food?")} 
          className="shrink-0 text-xs font-semibold tracking-wide px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
        >
          Wait for Food?
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 md:p-5 bg-white relative z-20">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            aria-label="Type your message to AI"
            placeholder="Ask AI anything..." 
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-2xl py-4 flex-1 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder-slate-400 disabled:opacity-50 text-base"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

    </div>
  );
};

export default GeminiConcierge;
