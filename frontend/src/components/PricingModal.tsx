import React from 'react';
import { Lock, CheckCircle, X } from 'lucide-react';
import { PricingModalProps } from '@/types';
import { PACKAGES } from '@/constants/data';

const PricingModal = ({ isOpen, close, downloadsLeft }: PricingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={close}></div>

      <div className="relative bg-[#18181b] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center bg-gradient-to-b from-rose-900/20 to-transparent">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Lock size={28} className="text-rose-500" />
          </div>
          <h2 className="text-white text-xl font-bold mb-1">Tính năng dành cho VIP</h2>
          {downloadsLeft !== undefined && (
            <p className="text-zinc-400 text-sm">
              Bạn còn <span className="text-rose-400 font-bold">{downloadsLeft}</span> lần tải miễn phí hôm nay
            </p>
          )}
        </div>

        <div className="p-6 space-y-4">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className={`p-4 rounded-2xl border ${pkg.best ? "border-rose-500 bg-rose-500/10" : "border-zinc-700 bg-zinc-900"}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-lg font-bold">{pkg.name}</h3>
                {pkg.best && <span className="text-xs px-2 py-1 bg-rose-600 text-white rounded-full">BEST DEAL</span>}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-rose-400">{pkg.price}</span>
                <span className="text-sm line-through text-zinc-500">{pkg.oldPrice}</span>
                <span className="text-zinc-400 text-sm">{pkg.period}</span>
              </div>
              <ul className="mt-3 space-y-1 text-zinc-400 text-sm">
                {pkg.features.map((f, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <CheckCircle size={14} className="text-rose-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-white font-bold active:scale-95 transition-transform">
                Nâng cấp ngay
              </button>
            </div>
          ))}
        </div>

        <button onClick={close} className="absolute top-3 right-3 text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default PricingModal;