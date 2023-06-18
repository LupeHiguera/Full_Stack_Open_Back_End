const Person = ({ name, phoneNumber, deletePerson}) => {
    return(
        <div>
            {name} {phoneNumber}
            <button onClick={deletePerson}>Delete {name}</button>
        </div>
    )
}

export default Person