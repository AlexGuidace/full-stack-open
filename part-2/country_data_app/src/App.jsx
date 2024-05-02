import { useState, useEffect } from 'react';

import Header from './components/Header';
import restCountriesService from './services/restCountriesService';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountryNames, setAllCountryNames] = useState(null);
  const [filteredCountryNames, setFilteredCountryNames] = useState([]);
  const [isMaxCountries, setIsMaxCountries] = useState(false);

  useEffect(() => {
    restCountriesService.getAllCountries().then((countries) => {
      // Map through array of countries returned by the API to get their names in an array.
      const names = countries.map((country) => country.name.common);
      setAllCountryNames(names);
    });
  }, []);

  const handleSearchTerm = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    // Filter all country names that include the search value entered by the user. We include a ternary operator, since a searchValue of '' will return an array of all countries. The API takes a second to fetch the data, so we catch errors if they occur.
    try {
      const searchedCountries =
        searchValue !== ''
          ? allCountryNames.filter((country) =>
              country.toLowerCase().includes(searchValue.toLowerCase())
            )
          : [];

      console.log(searchedCountries);

      if (searchedCountries.length > 10) {
        setIsMaxCountries(true);
      } else if (
        (searchedCountries.length >= 1 && searchedCountries.length <= 10) ||
        searchedCountries.length < 1
      ) {
        setIsMaxCountries(false);
      }

      setFilteredCountryNames(searchedCountries);
    } catch (error) {
      // TODO: Create notification to display errors.
      console.log(`Country names have not been loaded yet: '${error}'`);
    }
  };

  return (
    <div>
      <Header title={'Country Data App'} />
      <label htmlFor="country-input">Look up countries by name: </label>
      <input
        type="text"
        id="country-input"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
      {isMaxCountries ? (
        <p>
          Too many country matches; please be more specific with your query.
        </p>
      ) : (
        <ul>
          {filteredCountryNames.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
