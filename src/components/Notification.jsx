const Notification = ({ message, type }) => {
    if (message === null){
        return null
    }
    const color = 
        type === 'error' 
            ? 'bg-red-100 text-red-700 border-red-400'
            : 'bg-green-100 text-green-700 border-green-400'
    return(
        <div className={`border ${color} px-4 py-3 rounded-md mb-4 text-center font-medium`}>
            {message}
        </div>
    )
} 
export default Notification