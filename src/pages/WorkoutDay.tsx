import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AddExerciseModal from '@/components/AddExerciseModal';
import { ArrowLeft, Plus, Music2, Trash2 } from 'lucide-react';

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
  const [musicService, setMusicService] = useState<'spotify' | 'youtube'>('spotify');

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

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const toggleMusicService = () => {
    setMusicService(prev => prev === 'spotify' ? 'youtube' : 'spotify');
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
            <Card key={index} className="bg-white/10 backdrop-blur-sm p-4 mb-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium capitalize text-white">{exercise.name}</h3>
                  <p className="text-sm text-white/90">{exercise.sets} sets × {exercise.reps} reps</p>
                  <span className="inline-block mt-2 text-xs bg-[#18435a]/80 px-2 py-1 rounded text-white/90">
                    {exercise.targetMuscle}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteExercise(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-white/60">
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
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Currently playing on: {musicService}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMusicService}
              className="text-white hover:bg-[#18435a]"
            >
              Switch to {musicService === 'spotify' ? 'YouTube Music' : 'Spotify'}
            </Button>
          </div>
          {musicService === 'spotify' ? (
            <iframe
              className="w-full h-20 rounded"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX70RN3TfWWJh?utm_source=generator&theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <iframe
              className="w-full h-20 rounded"
              src="https://music.youtube.com/embed/playlist?list=RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}
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