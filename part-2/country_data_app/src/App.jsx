import { useState, useEffect } from 'react';

import Header from './components/Header';
import Country from './components/Country';
import ClickableCountry from './components/ClickableCountry';
import restCountriesService from './services/restCountriesService';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountryNames, setAllCountryNames] = useState(null);
  const [isMaxCountries, setIsMaxCountries] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // TODO: Add catch block.
    restCountriesService.getAllCountries().then((countries) => {
      // Map through array of countries returned by the API to get their names in an array.
      const names = countries.map((country) => country.name.common);
      setAllCountryNames(names);
    });
  }, []);

  useEffect(() => {
    // If we only have one country, display more of its information.
    if (countries.length === 1) {
      // TODO: Add catch block.
      restCountriesService.getCountry(countries[0].name).then((data) => {
        setCountryData(data);
      });
    }
  }, [countries]);

  const handleCountrySearch = (e) => {
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

      // Determines if we display 1-10 countries that were filtered, or none at all.
      if (searchedCountries.length > 10) {
        setIsMaxCountries(true);
      } else if (
        (searchedCountries.length >= 1 && searchedCountries.length <= 10) ||
        searchedCountries.length < 1
      ) {
        setIsMaxCountries(false);
      }

      // Populate an array of objects for each country that was found in the search, to control display of those countries' information.
      const countryObjects = searchedCountries.map((country) => ({
        name: country,
        isShown: true,
      }));

      // TODO: Possibly wrap this in a setTimeout() to account for high API network latency?
      setCountries(countryObjects);
    } catch (error) {
      // TODO: Create notification to display errors.
      console.log(`Country names have not been loaded yet: '${error}'`);
    }
  };

  const handleCountryClick = (countryName) => {
    // Update the countries array, clicked-country boolean that controls whether or not we display a clicked country's information.
    const updatedCountries = countries.map((countryObject) =>
      countryObject.name.toLowerCase() === countryName.toLowerCase()
        ? { ...countryObject, isShown: !countryObject.isShown }
        : countryObject
    );

    // Update the state for our countries with the updated country object
    setCountries(updatedCountries);

    restCountriesService.getCountry(countryName).then((data) => {
      setCountryData(data);
    });
  };

  return (
    <div>
      <Header title={'Country Data App'} />
      <label htmlFor="country-input">Look up countries by name: </label>
      <input
        type="text"
        id="country-input"
        value={searchTerm}
        onChange={handleCountrySearch}
      />
      {isMaxCountries ? (
        <p>
          Too many country matches; please be more specific with your query.
        </p>
      ) : (
        <ul>
          {countries.map((country) =>
            countries.length === 1 ? (
              <Country key={country.name} countryData={countryData} />
            ) : (
              <ClickableCountry
                key={country.name}
                country={country.name}
                isShown={country.isShown}
                onClick={() => handleCountryClick(country.name)}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default App;
