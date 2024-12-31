import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AddExerciseModal from '@/components/AddExerciseModal';
import { ArrowLeft, Plus, Music2 } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  targetMuscle: string;
}

const WorkoutDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  useEffect(() => {
    const savedExercises = localStorage.getItem(`workout_${day}`);
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }
  }, [day]);

  const handleAddExercise = (exercise: Exercise) => {
    const updatedExercises = [...exercises, exercise];
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  return (
    <div className="min-h-screen bg-[#13293d] text-white">
      <header className="bg-[#16324f] p-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="text-white hover:bg-[#18435a]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">{day} Workout</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMusicPlayer(!showMusicPlayer)}
          className="ml-auto text-white hover:bg-[#18435a]"
        >
          <Music2 className="w-6 h-6" />
        </Button>
      </header>

      <main className="p-4 pb-24">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Card key={index} className="bg-[#16324f] p-4 mb-4">
              <h3 className="text-lg font-medium capitalize">{exercise.name}</h3>
              <p className="text-sm opacity-80">{exercise.sets} sets × {exercise.reps} reps</p>
              <span className="inline-block mt-2 text-xs bg-[#18435a] px-2 py-1 rounded">
                {exercise.targetMuscle}
              </span>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No exercises added yet. Click the + button to add exercises.
          </div>
        )}

        <Button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-[#18435a] hover:bg-[#16324f]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      {showMusicPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#16324f] p-4 border-t border-[#18435a]">
          <iframe
            className="w-full h-16 rounded"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX70RN3TfWWJh"
            allow="encrypted-media"
          />
        </div>
      )}

      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExercise}
      />
    </div>
  );
};

export default WorkoutDay;