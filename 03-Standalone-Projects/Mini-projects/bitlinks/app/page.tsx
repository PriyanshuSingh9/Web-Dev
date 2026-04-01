import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center">
      <section className="container mx-auto px-6 py-12 flex flex-col lg:flex-row justify-between items-center gap-12 w-full">
        <div className="flex-1 max-w-2xl text-center lg:text-left flex flex-col gap-6">
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            The best URL <span className="text-blue-600">Shortener</span> in the market
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are the most straightforward URL Shortener in the world. Most shorteners track you or require login details. We understand your needs, and that's why we created <span className="font-bold text-slate-900">BitLinks</span>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <Link
              href="/shorten"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95"
            >
              Try Now
            </Link>
            <Link
              href="/about"
              className="bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:text-blue-600 active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full max-w-2xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-100">
            <Image
              src="/vector.jpg"
              width={640}
              height={335}
              alt="BitLinks Hero Image"
              className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
