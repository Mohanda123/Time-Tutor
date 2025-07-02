import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, XCircle, BookOpen, TrendingUp, Target } from "lucide-react";
import { getTodayPlans, updateStudyPlanStatus } from "@/utils/studyPlanStorage";
import { toast } from "@/hooks/use-toast";

const TrackProgress = () => {
  const [plans, setPlans] = useState(getTodayPlans());
  
  const completedCount = plans.filter(plan => plan.status === 'Complete').length;
  const skippedCount = plans.filter(plan => plan.status === 'Skipped').length;
  const totalCount = plans.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleStatusUpdate = (planId: string, status: 'Complete' | 'Skipped') => {
    updateStudyPlanStatus(planId, status);
    setPlans(getTodayPlans()); // Refresh the plans
    
    if (status === 'Complete') {
      toast({
        title: "Semma da! One step closer to victory! 💪",
        description: "Task completed successfully!",
      });
    } else {
      toast({
        title: "No problem da! Try again next time! 💫",
        description: "Task marked as skipped.",
        variant: "destructive",
      });
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complete': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Skipped': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <BookOpen className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gradient">Track Progress</h1>
        <div className="w-16"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Overview */}
          <div className="bg-card p-6 rounded-2xl card-glow">
            <div className="text-center mb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Today's Progress</h2>
              <p className="text-muted-foreground">Keep tracking, keep winning!</p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{skippedCount}</div>
                <div className="text-sm text-muted-foreground">Skipped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalCount}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>

          {/* Task List */}
          {plans.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">
                Epdi poguthu un progress? 📊
              </h3>
              
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="bg-card p-6 rounded-2xl card-glow border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(plan.status)}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold">{plan.subject}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getImportanceColor(plan.importance)}`}>
                          {plan.importance}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {plan.time}
                      </p>

                      {/* Action Buttons */}
                      {plan.status === 'Incomplete' && (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleStatusUpdate(plan.id, 'Complete')}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex-1"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Done ✅
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(plan.id, 'Skipped')}
                            variant="outline"
                            className="border-red-400/20 text-red-400 hover:bg-red-400/10 rounded-xl flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Skip ❌
                          </Button>
                        </div>
                      )}

                      {/* Status Display */}
                      {plan.status !== 'Incomplete' && (
                        <div className={`text-center py-2 px-4 rounded-xl ${
                          plan.status === 'Complete' 
                            ? 'bg-green-400/10 text-green-400' 
                            : 'bg-red-400/10 text-red-400'
                        }`}>
                          {plan.status === 'Complete' ? '✅ Completed!' : '❌ Skipped'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Inga tracking panrathu onnum illa da! 😅
              </h2>
              <p className="text-muted-foreground mb-6">
                First plan add pannu, then vandhu track pannu!
              </p>
              <Link to="/add-schedule">
                <Button className="bg-primary hover:bg-primary/80 text-black font-semibold rounded-xl button-glow">
                  Add Your First Plan
                </Button>
              </Link>
            </div>
          )}

          {/* Motivational Message */}
          {completedCount > 0 && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border border-primary/20 text-center">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Keep it up da! 🔥
              </h3>
              <p className="text-muted-foreground">
                {completedCount === totalCount 
                  ? "Perfect score! All tasks completed! 🏆" 
                  : `${completedCount} tasks done, ${totalCount - completedCount - skippedCount} to go!`}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 px-4">
        <p className="text-sm text-muted-foreground">
          Made with ❤️ by Mohan – TimeTutor
        </p>
      </footer>
    </div>
  );
};

export default TrackProgress;