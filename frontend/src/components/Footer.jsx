// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Startups Directory</span>
        <nav className="flex items-center gap-4">
          <a className="hover:underline" href="/about">About</a>
          <a className="hover:underline" href="/privacy">Privacy</a>
          <a className="hover:underline" href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
