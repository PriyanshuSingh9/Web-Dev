"use client"
import submitAction from "@/actions/form";

export default function Home() {

  return (
    <div>
      <form action={(e) => { submitAction(e) }}>
        {/* instead of the submit action being a POST requst we can handle submission using a function that will run 
        in the server*/}
        <div className="flex gap-4 justify-center ">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="bg-white text-black" />
        </div>
        <div className="flex gap-4 justify-center ">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" className="bg-white text-black" />
        </div>
        <div className="flex gap-4 justify-center">
          <button className=" w-fit  border-white border-2 p-2">Submit</button>
        </div>
      </form>
    </div>
  );
}
