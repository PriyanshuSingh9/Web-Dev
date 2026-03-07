import Image from "next/image";
import Navbar from "@/components/landing-page/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex lg:flex-row items-center justify-center lg:justify-evenly min-h-[calc(100vh-74px)] p-8 md:p-12 gap-12 lg:gap-8 border-t border-[#313338] dark:border-white">
        <div className="flex flex-col gap-6 max-w-2xl text-center lg:text-left">
          <h1 className="text-foreground text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Group Chat That's All Fun & Games
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
          </p>
        </div>
        <div className="w-full max-w-100 lg:max-w-162.5 flex justify-center">
          <Image
            src="/discord-home.png"
            height={500}
            width={650}
            alt="landing page image"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </main>
    </>
  );
}
