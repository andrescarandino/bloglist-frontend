import React, { useState } from 'react'

const FormBlog = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [visible, setVisible] = useState(false)

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const newBlog = { title, author, url }
    // onCreate recibe también callback para resetear form
    try {
      await onCreate(newBlog, resetForm)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      {!visible && (
        <button
          className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition shadow-md"
          onClick={() => setVisible(true)}
        >
          create new
        </button>
      )}
      {visible && (
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
          <h3>Create new</h3>
          <form
            className="bg-white rounded-xl shadow p-6 space-y-4 mb-6"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                placeholder='Tittle'
                id="title"
                value={title} onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Author"
                id="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="URL"
                id="url" value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <div className="flex space-x-4 mt-4">

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition"
                type="submit"
                disabled={submitting}>{submitting ? 'creating...' : 'create'}</button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
                type="button"
                onClick={() => { resetForm(); setVisible(false) }}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default FormBlog