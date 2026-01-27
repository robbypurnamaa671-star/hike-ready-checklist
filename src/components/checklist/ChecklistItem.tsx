import { cn } from '@/lib/utils';
import { ChecklistItem as ChecklistItemType } from '@/types/hike';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (itemId: string, checked: boolean) => void;
}

export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl transition-all cursor-pointer touch-target',
        'bg-card border border-border/50 hover:border-border',
        item.checked && 'bg-muted/50 border-muted'
      )}
    >
      <Checkbox
        checked={item.checked}
        onCheckedChange={(checked) => onToggle(item.id, checked === true)}
        className={cn(
          'mt-0.5 h-6 w-6 rounded-lg border-2',
          item.checked 
            ? 'border-success bg-success data-[state=checked]:bg-success data-[state=checked]:border-success' 
            : item.isCritical 
              ? 'border-destructive' 
              : 'border-border'
        )}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn(
            'font-medium text-foreground',
            item.checked && 'line-through text-muted-foreground'
          )}>
            {item.name}
          </span>
          
          {item.isCritical && !item.checked && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
              <AlertTriangle className="h-3 w-3" />
              Critical
            </span>
          )}
          
          {item.status === 'required' && !item.isCritical && !item.checked && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Required
            </span>
          )}
          
          {item.status === 'recommended' && !item.checked && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              Recommended
            </span>
          )}
        </div>
        
        <p className={cn(
          'text-sm text-muted-foreground mt-1',
          item.checked && 'line-through'
        )}>
          {item.description}
        </p>
      </div>
    </label>
  );
}
