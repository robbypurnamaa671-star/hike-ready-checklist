import { Home, PlusCircle, ClipboardCheck } from 'lucide-react';
import { NavItem } from './NavItem';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/plan/new" icon={PlusCircle} label="New Hike" />
        <NavItem to="/checklist" icon={ClipboardCheck} label="Checklist" />
      </div>
    </nav>
  );
}
