import { cn } from '@/lib/utils';
import { ReadinessStatus } from '@/types/hike';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface ReadinessIndicatorProps {
  percentage: number;
  status: ReadinessStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ReadinessIndicator({ 
  percentage, 
  status, 
  size = 'md',
  showLabel = true 
}: ReadinessIndicatorProps) {
  const sizeClasses = {
    sm: 'h-16 w-16 text-lg',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-32 w-32 text-3xl',
  };

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const statusConfig = {
    ready: {
      bg: 'bg-success',
      text: 'text-success-foreground',
      icon: CheckCircle2,
      label: 'Ready!',
    },
    caution: {
      bg: 'bg-warning',
      text: 'text-warning-foreground',
      icon: AlertTriangle,
      label: 'Caution',
    },
    'not-ready': {
      bg: 'bg-destructive',
      text: 'text-destructive-foreground',
      icon: XCircle,
      label: 'Not Ready',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn('relative flex items-center justify-center', sizeClasses[size])}>
        {/* Background circle */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/50"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn(
              status === 'ready' && 'text-success',
              status === 'caution' && 'text-warning',
              status === 'not-ready' && 'text-destructive'
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-out',
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="flex flex-col items-center justify-center z-10">
          <span className="font-bold">{percentage}%</span>
        </div>
      </div>
      
      {showLabel && (
        <div className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
          config.bg,
          config.text
        )}>
          <Icon className={iconSize[size]} />
          <span>{config.label}</span>
        </div>
      )}
    </div>
  );
}
