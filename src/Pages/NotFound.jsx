import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-slate-900 text-white px-5 py-3 text-sm hover:bg-slate-800">
        Back to home
      </Link>
    </div>
  );
}
