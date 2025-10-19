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
        <button onClick={() => setVisible(true)}>create new</button>
      )}
      {visible && (
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
          <h3>Create new</h3>
          <form onSubmit={handleSubmit}>
            <div>
              title
              <input id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
              author
              <input id="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              url
              <input id="url" value={url} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit" disabled={submitting}>{submitting ? 'creating...' : 'create'}</button>
            <button type="button" onClick={() => { resetForm(); setVisible(false) }} style={{ marginLeft: 8 }}>
              cancel
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FormBlog