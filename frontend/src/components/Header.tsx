import React from 'react';
import { Menu, Zap, X } from 'lucide-react';
import { HeaderProps } from '@/types';

const Header = ({ toggleSidebar, userType }: HeaderProps) => (
  <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4">
    <div className="flex items-center gap-3">
      <button onClick={toggleSidebar} className="md:hidden text-zinc-400 hover:text-white">
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-1 font-black text-xl tracking-tighter cursor-pointer">
        <div className="w-8 h-8 bg-gradient-to-br from-rose-600 to-orange-600 rounded-lg flex items-center justify-center text-white">
          <Zap size={18} fill="currentColor" />
        </div>
        <span className="text-white">ToolHub<span className="text-[#e11d48]">Pro</span></span>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
        <a href="#" className="hover:text-white transition-colors">Tools</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </nav>
      {userType === 'FREE' && (
        <div className="hidden md:flex w-[200px] h-[40px] bg-zinc-800/50 rounded items-center justify-center text-[10px] border border-dashed border-zinc-700 relative">
             <span className="text-zinc-500">Banner Ads Space</span>
             <button className="absolute top-1 right-1"><X size={10} className="text-zinc-600"/></button>
        </div>
      )}
    </div>
  </header>
);

export default Header;