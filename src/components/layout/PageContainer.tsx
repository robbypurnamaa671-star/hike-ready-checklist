import { ReactNode } from 'react';
import { BottomNav } from '@/components/navigation/BottomNav';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  hideNav?: boolean;
}

export function PageContainer({ children, className, hideNav = false }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={cn('pb-24', className)}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
