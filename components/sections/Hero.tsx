export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-6 md:py-10">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <video
          src="/media/mk2-home-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-auto w-full rounded-[2rem]"
        />
      </div>
    </section>
  );
}
