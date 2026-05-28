import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-6 md:py-10">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Image
          src="/media/Group 4 (1).png"
          alt="lotabin Mk.2 hero preview"
          width={1920}
          height={1090}
          priority
          className="h-auto w-full rounded-[2rem]"
        />
      </div>
    </section>
  );
}
