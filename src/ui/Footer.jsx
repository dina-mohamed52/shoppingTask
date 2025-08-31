export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto text-center space-y-2">
        <p className="text-sm">© 2025 baby style. كل الحقوق محفوظة.</p>
        <p className="text-sm">
          تصميم وتطوير: <span className="font-semibold">Dina Mohamed</span>
        </p>
        <a
          href="https://wa.me/01114219671" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5"
            fill="currentColor"
          >
            <path d="M380.9 97.1C339-3.9 270.5-10.7 246.6 7c-8.4 6.3-19.4 22.7-29.6 44.3-10.1 21.6-14.2 40.8-12.2 48.1 4.3 16.3 41.4 96.1 53.6 116.3 10.2 16.8 22.6 27.5 30.2 27.5 10.7 0 21.4-4.3 29.7-11.5 11.6-10.2 23.2-32.9 28.6-54.4 2.4-9.4 5.3-22.5 9-39.4 5.2-22.7 10.6-41.8 12.8-44.5 2.3-2.7 3.7-6.6 3.7-10.6 0-3.9-1.5-8-3.8-10.7z" />
          </svg>
          واتساب المبرمج
        </a>
      </div>
    </footer>
  );
}
