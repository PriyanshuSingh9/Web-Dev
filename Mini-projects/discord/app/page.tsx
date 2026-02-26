import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <div className="text-3xl text-indigo-500 font-bold">Discord</div>
        <Button>Click Me</Button>
      </main>
    </>
  );
}
