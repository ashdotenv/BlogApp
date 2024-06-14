import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
function App() {
  let [blogs, setBlogs] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/blog/bulk").then(({ data }) => {
      setBlogs(data.blogs);
    })
  }, [])
  return (
    <>
      <div id="main">
        {blogs.map(({ title, content ,author},i) => (
          <div key={i}>
            {title},<br />
            {content} <br />
            {author.username}
          </div>
        )) ?? "Loading"}
      </div>
    </>
  )
}

export default App
