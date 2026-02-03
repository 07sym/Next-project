"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NoteCard } from "@/components/ui/NoteCard";




export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function loadNotes() {
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  }

  async function addNote() {
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    loadNotes();
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📝 Notes</h1>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button onClick={addNote}>Add Note</Button>

      <div className="space-y-3">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </main>
  );
}




