import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddExerciseModal from "@/components/AddExerciseModal";
import { ArrowLeft, Plus, Music2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  targetMuscle: string;
  isChecked: boolean;
}

const WorkoutDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);
  const [musicService, setMusicService] = useState<'youtube' | 'spotify'>('youtube');

  useEffect(() => {
    const savedExercises = localStorage.getItem(`workout_${day}`);
    const lastCheckedDate = localStorage.getItem("lastCheckedDate");
    const today = new Date().toLocaleDateString();

    if (savedExercises) {
      const parsedExercises: Exercise[] = JSON.parse(savedExercises);

      if (lastCheckedDate !== today) {
        parsedExercises.forEach((exercise) => (exercise.isChecked = false));
        localStorage.setItem("lastCheckedDate", today);
      }

      setExercises(parsedExercises);
    }
  }, [day]);

  const handleAddExercise = (exercise: Exercise) => {
    const updatedExercises = [...exercises, { ...exercise, isChecked: false }];
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, isChecked: !exercise.isChecked } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem(`workout_${day}`, JSON.stringify(updatedExercises));
  };

  return (
    <div className="min-h-screen bg-black text-gym-text">
      <header className="bg-black/50 backdrop-blur-sm p-4 flex items-center gap-4 border-b border-gym-accent/20 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-gym-text hover:text-gym-accent"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold capitalize">{day} Workout</h1>
        <div className="flex gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMusicService(musicService === 'youtube' ? 'spotify' : 'youtube')}
            className="text-gym-accent hover:text-gym-accent/80"
          >
            <Music2 className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
            className="text-gym-accent hover:text-gym-accent/80"
          >
            {isMusicPlayerExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      <main className="p-4 pb-24 max-w-2xl mx-auto">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Card
              key={index}
              className="bg-black/40 backdrop-blur-sm p-4 mb-4 relative border border-gym-accent/20 rounded-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium capitalize text-gym-text">{exercise.name}</h3>
                  <p className="text-sm text-gym-accent">{exercise.sets} sets × {exercise.reps} reps</p>
                  <span className="inline-block mt-2 text-xs bg-gym-accent/20 px-2 py-1 rounded-full text-gym-accent">
                    {exercise.targetMuscle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exercise.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                    className="text-gym-accent rounded border-gym-accent/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteExercise(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gym-accent/60">
            No exercises added yet. Click the + button to add exercises.
          </div>
        )}

        <Button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gym-accent hover:bg-gym-accent/90 text-black"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-gym-accent/20 transition-all duration-300 ${
          isMusicPlayerExpanded ? "h-3/5" : "h-14"
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsMusicPlayerExpanded(!isMusicPlayerExpanded)}
        >
          <span className="text-gym-accent">{musicService === 'youtube' ? 'YouTube Music' : 'Spotify'}</span>
          <span className="text-gym-accent">
            {isMusicPlayerExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </span>
        </div>
        {isMusicPlayerExpanded && (
          musicService === 'youtube' ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/videoseries?si=mesmokfisakvWsgg&list=PL9PwPs7-UT5xfmBfQ3UIbgDv7WWPvdCTy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[calc(100%-3rem)]"
            />
          ) : (
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX70RN3TfWWJh?utm_source=generator"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full h-[calc(100%-3rem)]"
            />
          )
        )}
      </div>

      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExercise}
      />
    </div>
  );
};

export default WorkoutDay;