export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-6 rounded-2xl text-center shadow-lg">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Selamat Datang di Restoran Sedap
      </h1>
      <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
        Nikmati berbagai sajian kuliner modern dengan cita rasa autentik dan pelayanan terbaik langsung dari dapur kami.
      </p>
      <button className="bg-white text-green-600 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition shadow">
        Pesan Sekarang
      </button>
    </div>
  );
}
