import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { HikePlan } from '@/types/hike';
import { getHikePlans, getActiveHikeId, setActiveHike, getChecklist, deleteHikePlan } from '@/lib/storage';
import { calculateReadiness } from '@/lib/checklist-generator';
import { ReadinessIndicator } from '@/components/readiness/ReadinessIndicator';
import { PlusCircle, Mountain, ChevronRight, Compass, Trash2, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Index() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<HikePlan[]>([]);
  const [activeId, setActiveIdState] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<HikePlan | null>(null);
  const { theme, toggleTheme } = useTheme();

  const loadPlans = () => {
    setPlans(getHikePlans());
    setActiveIdState(getActiveHikeId());
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleContinueHike = (id: string) => {
    setActiveHike(id);
    navigate('/checklist');
  };

  const handleNewHike = () => {
    navigate('/plan/new');
  };

  const handleDeleteClick = (e: React.MouseEvent, plan: HikePlan) => {
    e.stopPropagation();
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      deleteHikePlan(planToDelete.id);
      loadPlans();
    }
    setDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  const getHikeReadiness = (hikeId: string) => {
    const checklist = getChecklist(hikeId);
    if (!checklist) return null;
    return calculateReadiness(checklist.items);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="HikeReady"
        subtitle="Prepare with confidence"
        action={
          <div className="flex items-center gap-2">
            <Sun className={cn("h-4 w-4 transition-colors", theme === 'light' ? 'text-accent' : 'text-muted-foreground')} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Moon className={cn("h-4 w-4 transition-colors", theme === 'dark' ? 'text-accent' : 'text-muted-foreground')} />
          </div>
        }
      />
      
      <div className="px-4 space-y-6">
        {/* Hero Section */}
        <div className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Compass className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground">
                Ready to hike?
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Plan smart, pack right, hike safe
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleNewHike}
            className="w-full mt-5 h-12 rounded-xl"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Plan New Hike
          </Button>
        </div>
        
        {/* Active Hike */}
        {activeId && (
          <div>
            <h3 className="section-title mb-3 px-1">Continue Planning</h3>
            {(() => {
              const plan = plans.find(p => p.id === activeId);
              if (!plan) return null;
              
              const readiness = getHikeReadiness(plan.id);
              
              return (
                <div className="relative group">
                  <button
                    onClick={() => handleContinueHike(plan.id)}
                    className="w-full card-elevated p-4 text-left hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {readiness && (
                        <ReadinessIndicator 
                          percentage={readiness.percentage}
                          status={readiness.status}
                          size="sm"
                          showLabel={false}
                        />
                      )}
                      
                      <div className="flex-1 min-w-0 pr-8">
                        <h4 className="font-semibold text-foreground truncate">
                          {plan.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {plan.hikeType} • {plan.duration}h • {plan.terrain}
                        </p>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                  
                  <button
                    onClick={(e) => handleDeleteClick(e, plan)}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors touch-target"
                    aria-label="Delete hike"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })()}
          </div>
        )}
        
        {/* Recent Hikes */}
        {plans.length > 0 && (
          <div>
            <h3 className="section-title mb-3 px-1">Recent Hikes</h3>
            <div className="space-y-2">
              {plans.slice(0, 5).map(plan => {
                const readiness = getHikeReadiness(plan.id);
                const isActive = plan.id === activeId;
                
                return (
                  <div key={plan.id} className="relative group">
                    <button
                      onClick={() => handleContinueHike(plan.id)}
                      className={cn(
                        'w-full card-elevated p-4 text-left hover:border-primary/50 transition-colors',
                        isActive && 'border-primary/30'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                          <Mountain className="h-5 w-5 text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-16">
                          <h4 className="font-medium text-foreground truncate">
                            {plan.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {plan.hikeType} • {plan.terrain}
                          </p>
                        </div>
                        
                        {readiness && (
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium flex-shrink-0',
                            readiness.status === 'ready' && 'bg-success/10 text-success',
                            readiness.status === 'caution' && 'bg-warning/10 text-warning',
                            readiness.status === 'not-ready' && 'bg-muted text-muted-foreground'
                          )}>
                            {readiness.percentage}%
                          </span>
                        )}
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </button>
                    
                    <button
                      onClick={(e) => handleDeleteClick(e, plan)}
                      className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 touch-target"
                      aria-label="Delete hike"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {plans.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <Mountain className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              No hikes planned yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Create your first hike plan to get a personalized preparation checklist
            </p>
          </div>
        )}
        
        {/* Info Card */}
        <div className="card-elevated p-4 bg-muted/50">
          <h4 className="font-medium text-foreground mb-2">
            Why use HikeReady?
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Smart checklists based on your specific hike
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Never forget critical safety items
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Works completely offline
            </li>
          </ul>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete hike plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{planToDelete?.name}" and its checklist. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}
