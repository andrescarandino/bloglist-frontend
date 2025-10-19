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
    } catch (exception) {
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
    try {
      const created = await blogService.create(blogObject)
      setBlogs(prev => prev.concat(created))


      setNotification({
        message: `a new blog ${created.tittle} by ${created.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({
          message: null,
        type: null
        })
      }, 3000)
    } catch (error) {

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
        <Notification message={notification.message} type={notification.type} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-sm">
            <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Login</h2>
              <div>
                <label className="block text-sm text-gray-600">Username</label>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
                type="submit"
              >
                login
              </button>
            </form>
          </div>
        </div >
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-zinc-500 mb-6">
          BLOGS
        </h1>
        <Notification message={notification.message} type={notification.type} />
        <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md shadow-sm">

          <p className="text-m text-gray-700 mb-2">
            Logged in as <strong>{user.name}</strong>
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <FormBlog onCreate={handleCreateBlog} />
        <div>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App