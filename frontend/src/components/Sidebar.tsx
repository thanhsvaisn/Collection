import React from 'react';
import { SidebarProps } from '@/types';
import { TOOLS } from '@/constants/data';

const Sidebar = ({ isOpen, close, currentPath }: SidebarProps) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={close} />}
    <aside className={`fixed top-14 left-0 bottom-0 w-64 bg-[#0f0f0f] border-r border-white/5 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-4 space-y-1">
        <div className="text-xs font-bold text-zinc-500 uppercase px-3 mb-2">Menu</div>
        {TOOLS.map((tool) => (
          <div key={tool.id} className={`flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer group hover:bg-white/5 transition-all ${tool.path === currentPath ? 'bg-white/5 text-white' : 'text-zinc-400'}`}>
            <div className="flex items-center gap-3">
              <span className={tool.badge === 'VIP' ? 'text-yellow-500' : 'text-zinc-400 group-hover:text-white'}>{tool.icon}</span>
              <span className="font-medium text-sm">{tool.name}</span>
            </div>
            {tool.badge && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                tool.badge === 'HOT' ? 'bg-red-500/20 text-red-500' :
                tool.badge === 'VIP' ? 'bg-yellow-500/20 text-yellow-500' :
                tool.badge === 'NEW' ? 'bg-blue-500/20 text-blue-500' :
                'bg-zinc-800 text-zinc-400'
              }`}>
                {tool.badge}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-br from-rose-900/50 to-purple-900/50 border border-rose-500/30 p-4 rounded-xl">
          <p className="text-white font-bold text-sm mb-1">Kiếm tiền Online?</p>
          <p className="text-xs text-zinc-400 mb-3">Tham gia nhóm kín chia sẻ tut MMO mới nhất.</p>
          <button className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg">Tham gia ngay</button>
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;