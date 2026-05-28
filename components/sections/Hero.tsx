import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* VIDEO */}
      <div className="relative h-screen min-h-[900px] w-full">
        <video
          src="/public/media/mk2-home-hero.ver3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-8 sm:px-12 lg:px-20">
          <div className="max-w-[640px]">
            <div className="mb-6 inline-flex rounded-full border border-[#D9B97633] bg-[#D9B97612] px-5 py-2">
              <span className="text-[11px] uppercase tracking-[0.32em] text-[#D9B976]">
                Technology + Human Excellence
              </span>
            </div>

            <h1 className="text-balance text-[72px] font-semibold leading-[0.92] tracking-[-0.06em] text-[#F4EFE5] sm:text-[92px]">
              Changing the world with magic of motion picture
            </h1>

            <p className="mt-8 max-w-[520px] text-lg leading-8 text-[#F4EFE5B3]">
              lotabin aims for creating movies, experiences that connect creators with the community and the world.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">
                Get In Touch
              </Button>

              <Button href="/plans" variant="secondary" size="lg">
                View Advertisement Plans
              </Button>

              <Button href="/agencies" variant="ghost" size="lg">
                Creative Engine For Agencies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
