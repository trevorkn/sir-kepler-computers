export default function Hero() {
  return (
    <section className="flex justify-center items-center mt-12 mb-20">
      {/* Big Card */}
      <div className="w-[90%] md:w-3/4 h-[70vh] bg-cyan-200 border-4 border-blue-500 rounded-2xl shadow-[0_0_30px_#00f] flex overflow-hidden">
        
        {/* Left 2/3 - Text */}
        <div className="w-2/3 flex flex-col justify-center items-center text-center p-8">
          <h2 className="text-lg tracking-widest rotate-[-15deg] mb-4 text-black">
            WELCOME
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
            SIR <span className="text-purple-700">Kepler</span> Computers
          </h1>
          <p className="italic text-xl md:text-2xl text-black">
            Get amazing Deals ✨🛍️🎁
          </p>
        </div>

        {/* Right 1/3 - Image */}
        <div className="w-1/3 relative">
          <img
            src="/laptopsetup.jpeg"
            alt="pc setup"
            className="w-full h-full object-cover"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-yellow-300 font-bold text-xl md:text-2xl neon-glow">
            <p>Empowering</p>
            <p>Innovation!! 🚀🔥</p>
          </div>
        </div>
      </div>

      {/* Neon Glow Effect */}
      <style>
        {`
          .neon-glow {
            text-shadow: 0 0 8px #ff0, 0 0 16px #f0f, 0 0 24px #0ff;
          }
        `}
      </style>
    </section>
  );
}
