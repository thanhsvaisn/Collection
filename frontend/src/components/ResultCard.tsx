import React from 'react';
import { Download, Youtube, Lock, Music, CheckCircle, X } from 'lucide-react';
import { ResultCardProps } from '@/types';

const ResultCard = ({ data, loading, userType, onUpgradeClick }: ResultCardProps) => {
  if (loading) {
    return (
      <div className="mt-8 bg-[#18181b] rounded-2xl p-4 border border-white/5 animate-pulse max-w-3xl mx-auto">
        <div className="flex gap-4">
          <div className="w-24 h-24 md:w-40 md:h-24 bg-zinc-800 rounded-xl shrink-0"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
            <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            <div className="h-8 bg-zinc-800 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#18181b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-4 flex flex-col md:flex-row gap-4 border-b border-white/5">
          <div className="relative group shrink-0">
            {/* Note: Sử dụng next/image sẽ tốt hơn img thường */}
            <img src={data.thumbnail} alt="Thumb" className="w-full md:w-48 h-32 object-cover rounded-xl shadow-lg" />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">{data.duration}</div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2">{data.title}</h3>
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-4">
              <span className="bg-zinc-800 px-2 py-0.5 rounded text-white flex items-center gap-1"><Youtube size={12}/> YouTube</span>
              <span>•</span>
              <span>{data.author}</span>
            </div>
            
            <button className="md:hidden w-full bg-gradient-to-r from-[#ff3742] to-[#ff8a00] text-white font-bold py-2.5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Download size={18} /> TẢI NHANH (720P)
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#121212]">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4">
            {['360p', '480p'].map(q => (
              <button key={q} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 rounded-lg text-xs font-bold transition-colors active:scale-95">
                {q}
              </button>
            ))}
            <button className="bg-green-600/20 hover:bg-green-600/30 text-green-500 border border-green-600/50 py-2 rounded-lg text-xs font-bold transition-colors active:scale-95">
              720p HD
            </button>
            <button className="col-span-1 md:col-span-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/50 py-2 rounded-lg text-xs font-bold transition-colors active:scale-95">
              1080p
            </button>
            
            {['2K', '4K'].map(q => (
              <button key={q} onClick={onUpgradeClick} className="relative bg-zinc-900 border border-zinc-800 py-2 rounded-lg text-zinc-600 text-xs font-bold group overflow-hidden">
                <span className="flex items-center justify-center gap-1">
                  {q} <Lock size={10} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm border border-emerald-500/20 active:scale-95 transition-transform">
               <Music size={16} /> Tách Audio (MP3)
             </button>
             <button onClick={onUpgradeClick} className="bg-zinc-900 border border-zinc-800 text-zinc-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform relative overflow-hidden">
               <span className="absolute top-0 right-0 bg-yellow-600 text-[9px] text-white px-1.5 rounded-bl">VIP</span>
               <CheckCircle size={16} /> Tải Playlist
             </button>
          </div>
        </div>
      </div>

      {userType === 'FREE' && (
        <div className="mt-6 mx-auto w-full md:w-[728px] h-[90px] md:h-[90px] bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-600 relative overflow-hidden group">
           <span className="text-xs font-bold tracking-widest uppercase mb-1">Quảng Cáo</span>
           <p className="text-[10px]">Đăng ký VIP để ẩn quảng cáo này</p>
           <button className="absolute top-1 right-1 p-1 text-zinc-600 hover:text-white"><X size={12} /></button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;