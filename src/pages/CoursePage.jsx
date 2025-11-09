import { useParams, Link } from "react-router-dom";

export default function CoursePage() {
  const { coursename } = useParams();

  const title = coursename.replaceAll("-", " ");
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/courses" className="text-sm opacity-80 hover:opacity-100">← Back to courses</Link>
      <h1 className="text-3xl font-semibold mt-4 capitalize">{title}</h1>
      <p className="text-slate-300 mt-3">
        This is the <strong className="capitalize">{title}</strong> course page.
        Add syllabus, instructor info, and enrollment CTA here.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h2 className="text-xl font-medium">Syllabus snapshot</h2>
        <ul className="mt-3 list-disc pl-5 text-slate-300">
          <li>Introduction & setup</li>
          <li>Core concepts</li>
          <li>Projects & labs</li>
          <li>Capstone & assessment</li>
        </ul>
      </div>
    </main>
  );
}
