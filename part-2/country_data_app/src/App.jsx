import { useState, useEffect } from 'react';

import Header from './components/Header';
import Country from './components/Country';
import ClickableCountry from './components/ClickableCountry';
import restCountriesService from './services/restCountriesService';
import weatherService from './services/weatherService';

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

      // Determines if we display no countries if there are more than 10 and a message concerning that, or the 1-10 countries that were filtered by the search, or nothing at all if there were no matched searches.
      if (searchedCountries.length > 10) {
        setIsMaxCountries(true);
      } else if (
        (searchedCountries.length >= 1 && searchedCountries.length <= 10) ||
        searchedCountries.length < 1
      ) {
        setIsMaxCountries(false);

        // Populate an array of objects for each country that was found in the search. Each object contains the country's name, a boolean used to determine if we are to display that country's information, API overall information for that country, and API current weather data for that country's capital.
        const countryObjectsPromise = Promise.all(
          searchedCountries.map((country) =>
            restCountriesService.getCountry(country).then((countryData) =>
              weatherService
                .getCountryCapitalWeather(countryData.capitalInfo.latlng)
                .then((weatherData) => ({
                  name: country,
                  isHidden: true,
                  countryApiData: countryData,
                  capitalWeatherData: weatherData,
                }))
            )
          )
        );

        // Set the countries state with new country objects.
        countryObjectsPromise.then((countryObjects) => {
          // TODO: Possibly wrap this in a setTimeout() to account for high API network latency? Maybe create a loading notification?
          console.log('COUNTRY OBJECTS: ', countryObjects);
          setCountries(countryObjects);
        });
      }
    } catch (error) {
      // TODO: Create notification to display errors.
      console.log(`Country names have not been loaded yet: '${error}'`);
    }
  };

  const handleCountryClick = (countryName) => {
    // Update the countries array, clicked-country boolean that controls whether or not we display a clicked country's information.
    const updatedCountries = countries.map((countryObject) =>
      countryObject.name.toLowerCase() === countryName.toLowerCase()
        ? { ...countryObject, isHidden: !countryObject.isHidden }
        : countryObject
    );

    // Update the state for our countries with the updated country object
    setCountries(updatedCountries);
  };

  // Inline styles.
  const ulStyles = {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '10px',
    listStyleType: 'none',
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
        <ul style={ulStyles}>
          {countries.map((country) =>
            countries.length === 1 ? (
              <Country key={country.name} countryData={countryData} />
            ) : (
              <ClickableCountry
                key={country.name}
                country={country}
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
