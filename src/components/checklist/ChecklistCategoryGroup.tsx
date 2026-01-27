import { useState } from 'react';
import { ChecklistItem as ChecklistItemType, ChecklistCategory } from '@/types/hike';
import { ChecklistItem } from './ChecklistItem';
import { categoryLabels, categoryIcons } from '@/lib/checklist-generator';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface ChecklistCategoryGroupProps {
  category: ChecklistCategory;
  items: ChecklistItemType[];
  onToggleItem: (itemId: string, checked: boolean) => void;
}

export function ChecklistCategoryGroup({ 
  category, 
  items, 
  onToggleItem 
}: ChecklistCategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const isComplete = completedCount === totalCount;

  return (
    <div className="animate-slide-up">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between p-4 rounded-xl transition-colors touch-target',
          'bg-secondary/50 hover:bg-secondary'
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={categoryLabels[category]}>
            {categoryIcons[category]}
          </span>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">
              {categoryLabels[category]}
            </h3>
            <p className={cn(
              'text-sm',
              isComplete ? 'text-success' : 'text-muted-foreground'
            )}>
              {completedCount} of {totalCount} items
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
              Done
            </span>
          )}
          <ChevronDown 
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform',
              isExpanded && 'rotate-180'
            )} 
          />
        </div>
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2 pl-2">
          {items.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
