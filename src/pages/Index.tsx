import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '@/components/WorkoutCard';

interface WorkoutDay {
  day: string;
  duration?: string;
  exercises: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);

  useEffect(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const savedWorkouts = days.map(day => {
      const savedExercises = JSON.parse(localStorage.getItem(`workout_${day.toLowerCase()}`) || '[]');
      return {
        day,
        duration: savedExercises.length ? `${savedExercises.length * 15} mins` : undefined,
        exercises: savedExercises.length
      };
    });
    setWorkouts(savedWorkouts);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gym-text">
      <header className="bg-black/50 backdrop-blur-sm p-6 flex items-center gap-4 border-b border-gym-accent/20">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Your Daily Gym Companion</h1>
        </div>
      </header>
      
      <main className="p-6 max-w-2xl mx-auto">
        <div className="grid gap-6">
          <div className="bg-gym-accent/10 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Training Plan</h2>
            </div>
            <div className="grid gap-4">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.day}
                  day={workout.day}
                  duration={workout.duration}
                  exerciseCount={workout.exercises}
                  onClick={() => navigate(`/workout/${workout.day.toLowerCase()}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;