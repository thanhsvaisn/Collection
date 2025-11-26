'use client'

import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Menu, User, Loader2, 
  Youtube, Facebook, Instagram, Twitter, Music, BarChart3, ChevronRight 
} from 'lucide-react';

// Import Components
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ResultCard from '@/components/ResultCard';
import PricingModal from '@/components/PricingModal';
import { VideoResult, UserType } from '@/types';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [freeDownloads, setFreeDownloads] = useState(3);
  const [userType, setUserType] = useState<UserType>('FREE');

  // Auto-detect Logic
  useEffect(() => {
    if (url.length > 10 && (url.includes('http') || url.includes('www'))) {
       handleFetch();
    }
  }, [url]);

  const handleFetch = () => {
    if (loading || result) return;
    setLoading(true);
    
    // Simulate API Delay
    setTimeout(() => {
      setLoading(false);
      if (freeDownloads > 0) {
        setResult({
          title: "Gái Xinh TikTok Trend Mới Nhất 2025 | Nhạc Remix Cực Cuốn",
          author: "@hot_tiktoker_vn",
          duration: "00:45",
          thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop"
        });
        setFreeDownloads(prev => prev - 1);
      } else {
        setModalOpen(true);
      }
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-zinc-100 font-sans selection:bg-[#e11d48] selection:text-white pb-20 md:pb-0">
      
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} userType={userType} />
      
      <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} currentPath="/" />

      <main className={`transition-all duration-300 pt-20 px-4 md:ml-64`}>
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto text-center mt-6 md:mt-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            Tải Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Không Watermark</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
            Công cụ tải video TikTok, YouTube, Reels số #1 hiện nay. <br className="hidden md:block"/>
            <span className="text-green-500 font-bold">Miễn phí {freeDownloads} lượt hôm nay</span> • Nâng VIP để tải không giới hạn.
          </p>

          {/* INPUT AREA */}
          <div className="relative group max-w-3xl mx-auto">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#ff3742] to-[#ff8a00] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
             <div className="relative flex flex-col md:flex-row gap-2 bg-[#18181b] p-2 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex-1 flex items-center px-4 h-14 md:h-16">
                   <Search className="text-zinc-500 w-6 h-6 mr-3 shrink-0" />
                   <input 
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     placeholder="Dán link TikTok, YouTube, Insta..." 
                     className="w-full bg-transparent text-white text-lg placeholder-zinc-600 focus:outline-none h-full"
                   />
                   {!url && (
                     <button onClick={handlePaste} className="hidden md:block px-3 py-1 bg-zinc-800 text-xs text-zinc-400 rounded hover:text-white transition-colors">
                       Dán Link
                     </button>
                   )}
                </div>
                <button 
                  onClick={handleFetch}
                  className="h-14 md:h-16 px-8 md:w-48 bg-gradient-to-r from-[#ff3742] to-[#ff8a00] hover:brightness-110 text-white font-black text-lg md:text-xl rounded-xl shadow-lg shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                   {loading ? <Loader2 className="animate-spin" /> : 'TẢI NGAY'}
                </button>
             </div>
          </div>

          {/* Platforms Icons */}
          <div className="flex items-center justify-center gap-6 mt-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <Youtube size={24} />
             <div className="bg-white text-black p-0.5 rounded-full"><Music size={20} className="fill-current"/></div>
             <Instagram size={24} />
             <Facebook size={24} />
             <Twitter size={24} />
          </div>

          {/* RESULT AREA */}
          <ResultCard 
            data={result} 
            loading={loading} 
            userType={userType} 
            onUpgradeClick={() => setModalOpen(true)}
          />
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="mt-20 max-w-4xl mx-auto border-t border-white/5 pt-10 pb-10">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <BarChart3 className="text-[#e11d48]"/> Thống kê hôm nay
              </h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5">
                 <p className="text-zinc-500 text-sm mb-1">Lượt tải còn lại</p>
                 <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">{freeDownloads}</span>
                    <span className="text-sm text-zinc-500 mb-1">/ 10</span>
                 </div>
                 <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#e11d48] h-full rounded-full" style={{width: `${(freeDownloads/10)*100}%`}}></div>
                 </div>
              </div>

              <div 
                onClick={() => setModalOpen(true)}
                className="col-span-1 md:col-span-2 bg-gradient-to-r from-rose-900/20 to-orange-900/20 p-5 rounded-2xl border border-rose-500/30 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-colors"
              >
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">VIP</span>
                       <span className="font-bold text-white">Nâng cấp tài khoản</span>
                    </div>
                    <p className="text-sm text-zinc-400 group-hover:text-zinc-300">Mở khóa tải 4K, Playlist & Xóa quảng cáo</p>
                 </div>
                 <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <ChevronRight />
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-white/10 px-6 py-3 flex justify-between items-center z-40 pb-safe">
        <div className="flex flex-col items-center text-[#e11d48]">
           <Download size={20} />
           <span className="text-[10px] font-bold mt-1">Tải về</span>
        </div>
        <div className="flex flex-col items-center text-zinc-500" onClick={() => setSidebarOpen(true)}>
           <Menu size={20} />
           <span className="text-[10px] font-medium mt-1">Tools</span>
        </div>
        <div className="flex flex-col items-center text-zinc-500" onClick={() => setModalOpen(true)}>
           <User size={20} />
           <span className="text-[10px] font-medium mt-1">Account</span>
        </div>
      </div>

      <PricingModal 
        isOpen={modalOpen} 
        close={() => setModalOpen(false)} 
        downloadsLeft={freeDownloads}
      />
    </div>
  );
}