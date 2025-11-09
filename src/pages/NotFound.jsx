import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">404 — Page not found</h1>
      <p className="text-slate-300 mt-3">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block mt-6 underline">Go home</Link>
    </main>
  );
}
