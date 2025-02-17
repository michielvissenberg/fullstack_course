const RenderPersons = (props) => (
    <div>
        {props.persons.map( (person) => {
            if (person.name.toLowerCase().includes(props.filter)) {
                return <p key={person.id}>{person.name} {person.number}</p>
            }
            return null
        })}
    </div>
)

export default RenderPersons
