export type UserType = 'FREE' | 'VIP';

export interface VideoResult {
  title: string;
  author: string;
  duration: string;
  thumbnail: string;
}

export interface HeaderProps {
  toggleSidebar: () => void;
  userType: UserType;
}

export interface SidebarProps {
  isOpen: boolean;
  close: () => void;
  currentPath: string;
}

export interface ResultCardProps {
  data: VideoResult | null;
  loading: boolean;
  userType: UserType;
  onUpgradeClick: () => void;
}

export interface PricingModalProps {
  isOpen: boolean;
  close: () => void;
  downloadsLeft?: number;
}