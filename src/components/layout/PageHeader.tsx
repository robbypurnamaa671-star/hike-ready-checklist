import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBack = false, 
  action,
  className 
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={cn('px-4 pt-4 pb-2 safe-top', className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors touch-target"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}
