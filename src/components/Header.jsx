import { Link } from "react-router";

export function Header() {
  return (
    <div className="flex items-center justify-end">
      <Link
        to="/signup"
        className="rounded bg-green-500 text-white py-1 px-2 hover:bg-green-700 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}
