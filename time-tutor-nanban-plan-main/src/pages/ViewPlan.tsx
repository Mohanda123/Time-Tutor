
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Clock, Plus, Calendar, CheckCircle, XCircle, Target } from "lucide-react";
import { getTodayPlans, getMotivationalQuote } from "@/utils/studyPlanStorage";

const ViewPlan = () => {
  const todayPlans = getTodayPlans();
  const motivationalQuote = getMotivationalQuote();
  const today = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const completedCount = todayPlans.filter(plan => plan.status === 'Complete').length;
  const totalCount = todayPlans.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
      default: return <BookOpen className="w-5 h-5 text-primary" />;
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
        <h1 className="text-2xl font-bold text-gradient">My Study Plan</h1>
        <div className="w-16"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Date Header */}
          <div className="text-center">
            <div className="bg-primary/10 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Today's Plan</span>
            </div>
            <p className="text-muted-foreground">{today}</p>
          </div>

          {/* Progress Overview */}
          {todayPlans.length > 0 && (
            <div className="bg-card p-6 rounded-2xl card-glow">
              <h3 className="text-lg font-semibold text-center mb-4">Progress Overview</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Completed Tasks</span>
                  <span className="text-primary font-medium">{completedCount}/{totalCount} ({Math.round(progressPercentage)}%)</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-green-400 font-bold">{completedCount}</div>
                  <div className="text-muted-foreground">Done</div>
                </div>
                <div>
                  <div className="text-red-400 font-bold">{todayPlans.filter(p => p.status === 'Skipped').length}</div>
                  <div className="text-muted-foreground">Skipped</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-bold">{todayPlans.filter(p => p.status === 'Incomplete').length}</div>
                  <div className="text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          )}

          {/* Study Plans */}
          {todayPlans.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                Ippo enna padikka plan iruku? 📚
              </h2>
              
              {todayPlans.map((plan, index) => (
                <div 
                  key={plan.id} 
                  className={`bg-card p-6 rounded-2xl card-glow border transition-all duration-300 ${
                    plan.status === 'Complete' ? 'border-green-400/30' : 
                    plan.status === 'Skipped' ? 'border-red-400/30' : 
                    'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(plan.status)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                          #{index + 1}
                        </span>
                        <h3 className="text-lg font-semibold">{plan.subject}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getImportanceColor(plan.importance)}`}>
                          {plan.importance}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{plan.time}</span>
                      </div>
                      {plan.status !== 'Incomplete' && (
                        <div className={`text-sm font-medium ${
                          plan.status === 'Complete' ? 'text-green-400' : 'text-red-400'
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
                Inga onnum illa da! 😅
              </h2>
              <p className="text-muted-foreground mb-6">
                Plan add pannalaye! Vandhu study schedule podunga.
              </p>
              <Link to="/add-schedule">
                <Button className="bg-primary hover:bg-primary/80 text-black font-semibold rounded-xl button-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Plan
                </Button>
              </Link>
            </div>
          )}

          {/* Motivational Quote */}
          {todayPlans.length > 0 && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border border-primary/20 text-center">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Daily Motivation 🔥
              </h3>
              <p className="text-lg font-medium">
                {motivationalQuote}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {todayPlans.length > 0 && (
            <div className="flex gap-4 justify-center">
              <Link to="/add-schedule">
                <Button className="bg-secondary hover:bg-secondary/80 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More
                </Button>
              </Link>
              <Link to="/track-progress">
                <Button className="bg-primary hover:bg-primary/80 text-black rounded-xl">
                  <Target className="w-4 h-4 mr-2" />
                  Track Progress
                </Button>
              </Link>
            </div>
          )}

          {/* Stats Card */}
          {todayPlans.length > 0 && (
            <div className="bg-card/50 p-4 rounded-xl text-center">
              <p className="text-sm text-muted-foreground">
                Today you have <span className="text-primary font-semibold">{todayPlans.length}</span> subjects to study
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Keep going, you're doing great! 💪
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

export default ViewPlan;
