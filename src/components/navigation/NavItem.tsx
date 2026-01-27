import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export function NavItem({ to, icon: Icon, label }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <RouterNavLink
      to={to}
      className={cn(
        'flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] touch-target transition-colors',
        isActive 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className={cn('h-6 w-6', isActive && 'stroke-[2.5px]')} />
      <span className={cn('text-xs font-medium', isActive && 'font-semibold')}>
        {label}
      </span>
    </RouterNavLink>
  );
}
