import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import FormBlog from './components/FormBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    }catch(exception) {
      setNotification({
        message: "wrong username or password",
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        })
      }, 3000)

    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try{
      const created = await blogService.create(blogObject)
      setBlogs(prev => prev.concat(created))
      
      
      setNotification({
        message: `a new blog ${created.tittle} by ${created.author} added`,
        type: 'success'
      })
    }catch(error){
      
      setNotification({
        message: error.response.data.error, 
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        })
      }, 3000)
    }
  }


  if (user === null) {
    return (
      <>
        <div>Login to blog app</div>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <h1>blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      <FormBlog onCreate={handleCreateBlog} />
      <div>{user.name} logged in <button onClick={handleLogout}>Logout</button></div>
      <div>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App