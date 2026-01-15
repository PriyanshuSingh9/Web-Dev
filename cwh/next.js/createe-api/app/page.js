"use client"
export default function Home() {
  async function handleClick() {
    let data = {
      name: "Harry",
      roll_no: 32
    }
    let res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response)
  }
  return (
    <div>
      <h1>This is the home page for api testing</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
