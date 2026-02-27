function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-center py-6 mt-10">

      <p className="text-gold font-semibold text-lg">
        It’s Showtime 🎬
      </p>

      <p className="mt-2 text-sm">
        Book movies, select seats, and enjoy the show.
      </p>

      <p className="mt-3 text-xs text-gray-500">
        © {new Date().getFullYear()} Showtime. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;
