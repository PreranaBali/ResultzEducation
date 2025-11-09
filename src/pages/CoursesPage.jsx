import { Link } from "react-router-dom";

const courses = [
  "coding",
  "machine-learning",
  "cloud",
  "blockchain",
  "ui-ux",
];

export default function CoursesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c => (
          <li key={c} className="rounded-2xl border border-white/10 p-5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
            <h2 className="text-lg font-medium capitalize">{c.replaceAll("-", " ")}</h2>
            <p className="text-sm text-slate-300 mt-1">Dive into {c.replaceAll("-", " ")} with hands-on projects.</p>
            <Link to={`/courses/${c}`} className="inline-block mt-3 text-sm underline hover:no-underline">
              View course →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
