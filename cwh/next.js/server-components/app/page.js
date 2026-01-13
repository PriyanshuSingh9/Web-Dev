// import { useState } from "react";

// Next.js is a fullstack framework and every component here is by default a server component.

// This is a server component that cannot use useState and useEffect thus, to bring about this functionality we have to 
// create a separate component for the logic that uses these hooks which would be a client component.
import Navbar from "@/components/Navbar";

import fs from "fs/promises"

// In client components you should not use any information that you do not want accessible to the user such as the 
// database for those tasks we use a server component 
export default async function Home() {
  // const [count, setCount] = useState(0)

  // since home is a server component this log appears in the server console.
  console.log("Hey I am Priyanshu")

  let fileContent = await fs.readFile("data.json")
  let data = await JSON.parse(fileContent)

  console.log(data.filter((item) => item.userId === 1 && item.title === "optio molestias id quia eum"))
  return (
    <div>
      <Navbar />
      The value of count is
      {/* {count} */}
    </div>
  );
}
