import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!updatedNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedNote);
}


export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Note deleted" });
}
