import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '@/components/WorkoutCard';
import { Dumbbell } from 'lucide-react';

interface WorkoutDay {
  day: string;
  duration?: string;
  exercises: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutDay[]>([]);

  useEffect(() => {
    // Hide scrollbar but keep scrolling
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        display: none;
      }
      body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    // Load workouts from localStorage
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const savedWorkouts = days.map(day => {
      const savedExercises = JSON.parse(localStorage.getItem(`workout_${day.toLowerCase()}`) || '[]');
      return {
        day,
        duration: savedExercises.length ? `${savedExercises.length * 5} mins` : undefined,
        exercises: savedExercises.length
      };
    });
    setWorkouts(savedWorkouts);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#13293d] text-white">
      <header className="bg-[#16324f] p-4 flex items-center gap-2">
        <Dumbbell className="w-6 h-6" />
        <h1 className="text-xl font-bold">DailyGymMate</h1>
        <span className="text-sm opacity-80">Dashboard</span>
      </header>
      
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-6">Weekly Workout Plan</h2>
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
      </main>
    </div>
  );
};

export default Index;