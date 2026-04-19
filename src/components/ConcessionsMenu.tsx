import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, MapPin } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: 'Stadium Dog & Fries', price: 14.50, category: 'Food', wait: '4 min' },
  { id: 2, name: 'Craft IPA (16oz)', price: 12.00, category: 'Beverage', wait: '2 min' },
  { id: 3, name: 'Pretzel Bites', price: 8.50, category: 'Snack', wait: '3 min' },
  { id: 4, name: 'Team Jersey (Home)', price: 120.00, category: 'Merch', wait: '10 min' },
];

export function ConcessionsMenu() {
  const [cart, setCart] = useState<number[]>([]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
         <div>
           <h2 className="text-3xl font-bold text-white mb-2">In-Seat Delivery</h2>
           <p className="text-slate-400">Order from anywhere, delivered to your precise seat location.</p>
         </div>
         <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 flex items-center space-x-4 shadow-lg backdrop-blur-sm">
           <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
             <MapPin className="w-5 h-5 text-emerald-400" />
           </div>
           <div>
             <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Detected Location</div>
             <div className="text-base font-semibold text-white">Section 114, Row F, Seat 12</div>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={item.id} 
            className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col hover:bg-slate-800/60 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer shadow-xl"
          >
            <div className="flex justify-between items-start mb-5">
              <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 bg-slate-900/60 rounded-full text-slate-300 border border-slate-700">{item.category}</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded bg-emerald-900/20 border border-emerald-500/20 flex items-center gap-1">
                 Est. {item.wait}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-violet-300 transition-colors">{item.name}</h3>
            <div className="text-2xl font-light text-violet-400 mb-8">${item.price.toFixed(2)}</div>
            
            <button 
              onClick={() => setCart([...cart, item.id])}
              className="mt-auto w-full py-3.5 rounded-xl bg-violet-600/10 text-violet-300 border border-violet-500/20 font-semibold hover:bg-violet-600 hover:text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] active:scale-95 flex justify-center items-center gap-2"
            >
              Add to Order <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>
        ))}
      </div>

      {cart.length > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-auto pt-6 bottom-0 sticky pb-4"
        >
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 flex items-center justify-between shadow-2xl shadow-violet-900/50 border border-violet-400/20">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{cart.length} item(s) in order</div>
                <div className="text-violet-200 text-sm font-medium">Delivery to Sec 114, Row F, Seat 12</div>
              </div>
            </div>
            <button className="px-8 py-3.5 bg-white text-violet-900 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg active:scale-95 text-lg">
              Confirm Order
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
