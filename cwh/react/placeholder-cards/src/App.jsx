import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const user_arr = [
    "nightforge",
    "pixelroam",
    "voidrunner",
    "ashwind",
    "neonharbor",
    "codefable",
    "ironleaf",
    "duskpath",
    "cryptowl",
    "bluevertex"
  ]
  // to save and load posts
  const [posts, setPosts] = useState([])
  // to help display posts once they are loaded or just show loading screen
  const [loading, setLoading] = useState(true)

  const [currentUser, setCurrentUser] = useState("ALL");

  const filteredPosts =
    currentUser === "ALL"
      ? posts
      : posts.filter(
        (post) => user_arr[post.userId - 1] === currentUser
      );

  // to fetch posts from the jsonholder api
  async function fetchPosts() {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts")
      if (!response.ok) {
        throw new Error("Data not recieved")
      }
      let posts = await response.json()
      setPosts(posts)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  // {
  //   "userId",
  //     "id",
  //       "title",
  //         "body"
  // }
  // data schema

  function toTitleCase(str) {
    // Normalize the string to lowercase first for consistent results
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

  // on the first load fetch the posts
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="main">
          <Sidebar
            user_arr={user_arr}
            currentUser={currentUser}
            setUser={setCurrentUser}
          />
          <div className="container">
            {loading && <p className="load">Loading...</p>}

            {!loading &&
              filteredPosts.map((post) => {
                return (
                  <div key={post.id} className="post" >
                    <h3 className="title">{toTitleCase(post.title)}</h3>
                    <p className="body">{post.body}</p>
                    <div className="user">{user_arr[post.userId - 1].toUpperCase()}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div >
    </>
  );

}

export default App;
