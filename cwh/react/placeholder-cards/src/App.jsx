import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  // to save and load posts
  const [posts, setPosts] = useState([])
  // to help display posts once they are loaded or just show loading screen
  const [loading, setLoading] = useState(true)

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

  // on the first load fetch the posts
  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <>
      <div className="app">
        <Navbar />
        <div className="main">
          <Sidebar />
          <div className="container">
            {loading && <p>Loading...</p>}

            {!loading &&
              posts.map((post) => {
                return (
                  <div key={post.id} className="post" >
                    <h2 className="title">{post.title}</h2>
                    <p className="body">{post.body}</p>
                    <div className="user">{post.userId}</div>
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
