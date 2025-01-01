import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, StickyNote, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExerciseOptionsMenuProps {
  exerciseId: string;
  onDelete: () => void;
  onSaveNote: (note: string) => void;
  onSavePR: (pr: string) => void;
  currentNote?: string;
  currentPR?: string;
}

const ExerciseOptionsMenu = ({ 
  exerciseId, 
  onDelete, 
  onSaveNote, 
  onSavePR,
  currentNote,
  currentPR 
}: ExerciseOptionsMenuProps) => {
  const [note, setNote] = useState(currentNote || '');
  const [pr, setPR] = useState(currentPR || '');
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isPRDialogOpen, setIsPRDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveNote = () => {
    onSaveNote(note);
    setIsNoteDialogOpen(false);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };

  const handleSavePR = () => {
    onSavePR(pr);
    setIsPRDialogOpen(false);
    toast({
      title: "Personal Record saved",
      description: "Your PR has been updated successfully.",
    });
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    onDelete();
    toast({
      title: "Exercise deleted",
      description: "The exercise has been removed from your workout.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-6 w-6 p-0 hover:bg-gym-accent/10 rounded-full"
        >
          <MoreHorizontal className="h-4 w-4 text-gym-accent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-gym-dark border-gym-accent/20 w-48 rounded-xl shadow-lg shadow-black/20"
      >
        <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()} 
              className="text-gym-text hover:bg-gym-accent/10 focus:bg-gym-accent/10 rounded-lg m-1 text-sm py-2"
            >
              <StickyNote className="mr-2 h-4 w-4 text-gym-accent" />
              Add Note
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-gym-dark border-gym-accent/20">
            <DialogHeader>
              <DialogTitle className="text-gym-text">Add a note</DialogTitle>
            </DialogHeader>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="note" className="border-gym-accent/20">
                <AccordionTrigger className="text-gym-text hover:text-gym-accent">Current Note</AccordionTrigger>
                <AccordionContent className="text-gym-text">
                  {currentNote || "No note added yet"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[100px] bg-gym-medium text-gym-text border-gym-accent/20"
            />
            <Button onClick={handleSaveNote} className="bg-gym-accent text-gym-dark hover:bg-gym-accent/90">Save Note</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={isPRDialogOpen} onOpenChange={setIsPRDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()} 
              className="text-gym-text hover:bg-gym-accent/10 focus:bg-gym-accent/10 rounded-lg m-1 text-sm py-2"
            >
              <Trophy className="mr-2 h-4 w-4 text-gym-accent" />
              Add PR
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-gym-dark border-gym-accent/20">
            <DialogHeader>
              <DialogTitle className="text-gym-text">Add Personal Record</DialogTitle>
            </DialogHeader>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pr" className="border-gym-accent/20">
                <AccordionTrigger className="text-gym-text hover:text-gym-accent">Current PR</AccordionTrigger>
                <AccordionContent className="text-gym-text">
                  {currentPR ? `${currentPR} kg` : "No PR set yet"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Input
              type="number"
              value={pr}
              onChange={(e) => setPR(e.target.value)}
              placeholder="Enter your PR in kg"
              className="bg-gym-medium text-gym-text border-gym-accent/20"
            />
            <Button onClick={handleSavePR} className="bg-gym-accent text-gym-dark hover:bg-gym-accent/90">Save PR</Button>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DropdownMenuItem 
            className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 rounded-lg m-1 text-sm py-2"
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
          <AlertDialogContent className="bg-gym-dark border-gym-accent/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gym-text">Delete Exercise</AlertDialogTitle>
              <AlertDialogDescription className="text-gym-text/80">
                This action cannot be undone. This will permanently delete the exercise from your workout.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gym-medium text-gym-text hover:bg-gym-medium/80">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExerciseOptionsMenu;