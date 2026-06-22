import { LessonView } from "@/components/lesson-view";
import { modules } from "@/lib/data";

export function generateStaticParams() {
  return modules.map((m) => ({ id: String(m.id) }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LessonView id={Number(id)} />;
}
