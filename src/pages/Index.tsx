import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '@/components/WorkoutCard';
import { Dumbbell } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [workouts] = useState([
    { day: 'Monday', duration: '5 mins', exercises: 1 },
    { day: 'Tuesday', duration: undefined, exercises: 0 },
    { day: 'Wednesday', duration: undefined, exercises: 0 },
    { day: 'Thursday', duration: undefined, exercises: 0 },
    { day: 'Friday', duration: undefined, exercises: 0 },
  ]);

  return (
    <div className="min-h-screen bg-gym-dark text-white">
      <header className="bg-gym-medium p-4 flex items-center gap-2">
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