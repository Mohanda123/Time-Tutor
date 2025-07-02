
export interface StudyPlan {
  id: string;
  subject: string;
  time: string;
  date: string;
  importance: 'High' | 'Medium' | 'Low';
  status: 'Incomplete' | 'Complete' | 'Skipped';
}

const STORAGE_KEY = 'timetutor_study_plans';

export const getStudyPlans = (): StudyPlan[] => {
  try {
    const plans = localStorage.getItem(STORAGE_KEY);
    return plans ? JSON.parse(plans) : [];
  } catch (error) {
    console.error('Error reading study plans:', error);
    return [];
  }
};

export const addStudyPlan = (plan: Omit<StudyPlan, 'id' | 'status'>): void => {
  try {
    const plans = getStudyPlans();
    const newPlan: StudyPlan = {
      id: Date.now().toString(),
      status: 'Incomplete',
      ...plan,
    };
    plans.push(newPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving study plan:', error);
  }
};

export const updateStudyPlanStatus = (planId: string, status: StudyPlan['status']): void => {
  try {
    const plans = getStudyPlans();
    const updatedPlans = plans.map(plan => 
      plan.id === planId ? { ...plan, status } : plan
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
  } catch (error) {
    console.error('Error updating study plan status:', error);
  }
};

export const getTodayPlans = (): StudyPlan[] => {
  const today = new Date().toISOString().split('T')[0];
  return getStudyPlans().filter(plan => plan.date === today);
};

export const getMotivationalQuote = (): string => {
  const quotes = [
    "Padikka padichaa, Vetri thaan da varum! 🏆",
    "Pasanga padikkumbothu, Mass ah thaan irukum! 💪",
    "Success na shortcut illa da — daily effort dhaan key 🔥",
    "Oru naal namba per solla world wait panum! 🌟",
    "Hard work ku substitute illa da! Keep going! 💯",
    "Today's plan, tomorrow's success! Vera level da! 🚀",
    "Consistency thaan champion aakum! Rock on! 🎸",
    "Dream big, work smart, achieve more! Semma! ⚡"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
