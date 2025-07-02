
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { addStudyPlan } from "@/utils/studyPlanStorage";
import { toast } from "@/hooks/use-toast";

const AddSchedule = () => {
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [importance, setImportance] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !time.trim()) {
      toast({
        title: "Oops! Fields missing da!",
        description: "Subject, time, and importance ellam fill pannu!",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    addStudyPlan({
      subject: subject.trim(),
      time: time.trim(),
      importance,
      date: today,
    });

    toast({
      title: "Sari da! Un plan add panniduchu 💪",
      description: "Study plan successfully added!",
    });

    // Clear form
    setSubject("");
    setTime("");
    setImportance('Medium');

    // Navigate to view plan after a short delay
    setTimeout(() => {
      navigate("/view-plan");
    }, 1500);
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
        <h1 className="text-2xl font-bold text-gradient">Add Schedule</h1>
        <div className="w-16"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Form Card */}
          <div className="bg-card p-8 rounded-2xl card-glow">
            <div className="text-center mb-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Plan Your Study Time</h2>
              <p className="text-muted-foreground">Let's organize your learning!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Input */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Enna subject padikapora?
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Maths, Physics, English..."
                  className="h-12 text-lg bg-input border-border rounded-xl focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Time Input */}
              <div className="space-y-2">
                <Label htmlFor="time" className="text-lg font-medium flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Eppo padika pora? (Time)
                </Label>
                <Input
                  id="time"
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g., 7PM to 8PM, 2-3 hours..."
                  className="h-12 text-lg bg-input border-border rounded-xl focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Importance Input */}
              <div className="space-y-2">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Task importance? (Priority)
                </Label>
                <Select value={importance} onValueChange={(value: 'High' | 'Medium' | 'Low') => setImportance(value)}>
                  <SelectTrigger className="h-12 text-lg bg-input border-border rounded-xl focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select importance level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">🔴 High Priority</SelectItem>
                    <SelectItem value="Medium">🟡 Medium Priority</SelectItem>
                    <SelectItem value="Low">🟢 Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/80 text-black font-semibold text-lg rounded-xl button-glow transition-all duration-300 hover:scale-105"
              >
                Add to My Planner 🚀
              </Button>
            </form>
          </div>

          {/* Tips Card */}
          <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-2xl">
            <h3 className="font-semibold text-primary mb-3">Pro Tips da! 💡</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Specific time mention pannu (e.g., 7-8 PM)</li>
              <li>• Short subjects ah break pannu</li>
              <li>• Daily consistent ah be!</li>
            </ul>
          </div>
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

export default AddSchedule;
