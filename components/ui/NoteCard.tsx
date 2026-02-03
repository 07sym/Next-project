import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function NoteCard({ note }: any) {
  return (
    <Card>
      <CardHeader className="font-semibold">
        {note.title}
      </CardHeader>
      <CardContent>{note.content}</CardContent>
    </Card>
  );
}
