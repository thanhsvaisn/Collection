import { Download, Music, Instagram } from 'lucide-react';
import { LinkIcon, MessageSquareIcon } from '@/components/CustomIcons'; // Import từ file vừa tạo ở bước 2

export const TOOLS = [
  { id: 1, name: "Tải Video Đa Nền Tảng", icon: <Download size={18} />, badge: "HOT", path: "/" },
  { id: 2, name: "Clone Voice AI", icon: <Music size={18} />, badge: "NEW", path: "/clone-voice" },
  { id: 3, name: "Spam Comment TikTok", icon: <MessageSquareIcon size={18} />, badge: "VIP", path: "/spam-tool" },
  { id: 4, name: "Rút gọn link kiếm tiền", icon: <LinkIcon size={18} />, badge: "MONEY", path: "/short-link" },
  { id: 5, name: "Download Insta Story", icon: <Instagram size={18} />, badge: "FREE", path: "/insta-story" },
];

export const PACKAGES = [
  { id: 1, name: "VIP 1 Tháng", price: "99.000đ", oldPrice: "199.000đ", period: "/tháng", features: ["Không giới hạn tải", "Chất lượng 4K", "Tải Playlist", "Không quảng cáo"] },
  { id: 2, name: "VIP Trọn Đời", price: "499.000đ", oldPrice: "1.200.000đ", period: "/vĩnh viễn", features: ["Tất cả tính năng VIP", "Support 1-1", "Tool MMO Private"], best: true },
];