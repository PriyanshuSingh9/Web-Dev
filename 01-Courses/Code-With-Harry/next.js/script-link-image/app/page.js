import Image from "next/image";

export default function Home() {
  return (
    <div className="container min-w-screen">
      {/* instead of the img tag from html we use this tag as in smaller deevices it scales down the image making the
      file size considerably smaller.
      Prevents layout shift automatically when images are loading */}
      {/* Next.js does not have access to remote files during the build process, you'll need to provide the width, 
      height. To safely allow images from remote servers, you need to define a list of supported URL patterns in 
      next.config.js*/}
      {/* loader: A custom function used to generate the image URL. The function receives the following parameters, and 
      returns a URL string for the image 
      const imageLoader = ({ src, width, quality }) => {
        return `https://example.com/${src}?w=${width}&q=${quality || 75}`
      }*/}
      {/* quality
      An integer between 1 and 100 that sets the quality of the optimized image. Higher values increase file size and 
      visual fidelity. Lower values reduce file size but may affect sharpness. */}


      <Image src="https://i.pinimg.com/1200x/e9/70/9a/e9709ae4ada84e9a331801aa48a6606a.jpg" alt="" className="mx-auto" width={100} height={100} />
    </div>
  );
}
