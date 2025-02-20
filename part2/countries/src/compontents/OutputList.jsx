const Output = ({filteredCountries, onClick}) => (
    <div>
        {filteredCountries.map((country) => {
            return(
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => onClick(country)}>show</button>
                </div>
            )
        })}
    </div>    
)

export default Output