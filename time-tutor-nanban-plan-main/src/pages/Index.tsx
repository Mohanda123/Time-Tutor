
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Brain, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            TimeTutor
          </h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
          Vanakkam da! Ready ah neenga padikka? 🧠🔥
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          TimeTutor – Unnoda Study Planning Nanban
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Add Schedule Button */}
          <Link to="/add-schedule">
            <Button 
              className="w-full h-24 bg-primary hover:bg-primary/80 text-black font-semibold text-lg rounded-2xl button-glow transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <span>Add Schedule</span>
              </div>
            </Button>
          </Link>

          {/* Track Progress Button */}
          <Link to="/track-progress">
            <Button 
              className="w-full h-24 bg-secondary hover:bg-secondary/80 text-white font-semibold text-lg rounded-2xl button-glow transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <span>Track My Progress</span>
              </div>
            </Button>
          </Link>

          {/* View Plan Button */}
          <Link to="/view-plan">
            <Button 
              className="w-full h-24 bg-accent hover:bg-accent/80 text-black font-semibold text-lg rounded-2xl button-glow transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <span>View My Plan</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-12">
          <div className="bg-card p-6 rounded-2xl card-glow text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Time Management</h3>
            <p className="text-sm text-muted-foreground">Plan your day like a pro!</p>
          </div>
          <div className="bg-card p-6 rounded-2xl card-glow text-center">
            <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Planning</h3>
            <p className="text-sm text-muted-foreground">AI-powered study scheduling</p>
          </div>
          <div className="bg-card p-6 rounded-2xl card-glow text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">Monitor your success!</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4">
        <p className="text-lg font-medium text-primary mb-2">
          Namba Time la Success venum na, Planning da key! 🔑
        </p>
        <p className="text-sm text-muted-foreground">
          Made with ❤️ by Mohan – TimeTutor
        </p>
      </footer>
    </div>
  );
};

export default Index;
