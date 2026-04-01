import Image from "next/image";

export default function Home() {
  return <>
    <div className="flex flex-col justify-center items-center p-15 text-white gap-5 border-b-3 border-gray-800">

      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl flex justofy-center items-center gap-2">
          Buy me a Chai
          <span><Image src="/tea.gif" height={88} width={88} alt="tea" /></span>
        </h1>
        <div className="flex flex-col justify-center items-center p-4">
          <p >A crowdfunding platform for creators to fund their projects</p>
          <p>A place where fans can buy you a chai. Unleash the power of your fans and get your projects funded.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-linear-to-r from-[#503bef] from-0% to-[#8678f9] px-6 font-bold text-white transition-colors">
          Start Now
        </button>
        <button className="inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-linear-to-r from-[#503bef] from-0% to-[#8678f9] px-6 font-bold text-white transition-colors">
          Read More
        </button>
      </div>

    </div>

    <div className="flex flex-col justify-center items-center p-15 text-white gap-8 border-b-3 border-gray-800">
      <h2 className="font-bold text-2xl my-3">Your fans can buy you a Chai</h2>
      <div className="flex gap-30">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image src="/man.gif" width={80} height={80} alt="yo" className="bg-gray-400 rounded-full p-2" />
          <h2 className="text-center font-bold">Fans want to help</h2>
          <p className="text-center">Your fans are there to support you</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image src="/coin.gif" width={80} height={80} alt="yo" className="bg-gray-400 rounded-full p-2" />
          <h2 className="text-center font-bold">Fans want to contribute</h2>
          <p className="text-center">Your fans are willing to contribute financially</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src="/group.gif" width={80} height={80} alt="yo" className="bg-gray-400 rounded-full p-2" />
          <h2 className="text-center font-bold">Fans want to collaborate</h2>
          <p className="text-center text-xs">Your fans are ready to collaborate with you</p>
        </div>
      </div>

    </div >
    <div className="flex flex-col justify-center items-center p-15 text-white gap-8">
      <h2 className="font-bold text-2xl">Learn more about us</h2>
      <div className="w-full max-w-2xl mx-auto mt-10">
        <div className="relative pb-[56.25%] h-0">
          <iframe className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" src="https://www.youtube.com/embed/QtaorVNAwbI"
            title="Youtube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  </>
}
