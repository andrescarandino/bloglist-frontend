const Blog = ({ blog }) => (
  <div className="space-y-1 mb-2">
    <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
     <p className="text-sm text-gray-500">by {blog.author}</p>
  </div>  
)

export default Blog