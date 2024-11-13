const HeroSection = () => {
  return (
    <div className="relative h-[500px] bg-primary">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container flex relative items-center px-4 mx-auto h-full">
        <div className="max-w-2xl text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl font-heading">
            Temukan Petualangan Terbaikmu
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Jelajahi berbagai destinasi wisata menarik dan dapatkan pengalaman tak terlupakan
          </p>
          <button className="btn btn-secondary btn-lg">
            Mulai Petualangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 