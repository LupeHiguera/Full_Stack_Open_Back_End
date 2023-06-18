const Notification = ({ name }) => {
    if (name === null){
        return null
    }
    return (
        <div className='message'>
            {name}
        </div>
    )
}
export default Notification;