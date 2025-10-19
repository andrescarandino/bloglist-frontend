const Notification = ({ message, type }) => {
    if (message === null){
        return null
    }
    const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: '#f0f0f0',
    fontSize: 16,
    border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }
    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )
} 
export default Notification