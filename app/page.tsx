"use client";

import { useEffect, useState } from "react";

export type Note = {
  _id: string;
  title: string;
  content: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes", { cache: "no-store" });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);

    try {
      if (editingId) {
        const res = await fetch(`/api/notes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });

        const updatedNote: Note = await res.json();

        setNotes((prev) =>
          prev.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );

        setEditingId(null);
      } else {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });

        const newNote: Note = await res.json();
        setNotes((prev) => [newNote, ...prev]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

 
  const editNote = (note: Note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Notes App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Notes list */}
      {notes.length === 0 && (
        <p className="text-gray-500 text-sm">No notes yet</p>
      )}

      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded mb-3">
          <h2 className="font-semibold">{note.title}</h2>
          <p className="text-sm text-gray-700">{note.content}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => editNote(note)}
              className="bg-yellow-500 text-white px-3 py-1 text-sm rounded"
            >
              Update
            </button>

            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-600 text-white px-3 py-1 text-sm rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
