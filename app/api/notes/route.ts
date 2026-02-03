import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const note = await Note.create(body);
  return NextResponse.json(note, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();
  const note = await Note.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(note);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
