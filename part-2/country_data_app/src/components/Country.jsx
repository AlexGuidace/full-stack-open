/* eslint-disable react/prop-types */
import WeatherCard from './WeatherCard';

const Country = ({ country }) => {
  // The Countries API takes a while to respond to a user search--our country state has an initial value of null which won't be updated by the API as quickly as the rest of the app rerenders. That means the null value will be passed to this component, so, in this case, we don't do anything but return null. This component will render with data when the Countries API call resolves.
  if (country === null) {
    return null;
  }

  //  Create default value for entries without language information, like Antarctica.
  let languages = [['peng', 'Penguinese']];
  if (country.countryApiData.languages) {
    languages = Object.entries(country.countryApiData.languages);
  }

  let capitalMessage;
  if (!country.countryApiData.capital) {
    capitalMessage = 'This country does not have a capital.';
  } else {
    capitalMessage = `Its capital is ${country.countryApiData.capital}.`;
  }

  // Inline styles.
  const container = {
    display: 'block',
    padding: '25px',
    border: 'solid 1px',
    borderRadius: '5px',
    maxWidth: '280px',
  };

  const flexContainer = {
    display: 'flex',
    alignItems: 'center',
  };

  const languagesStyles = {
    marginBottom: '8px',
    fontFamily: 'Arial, sans-serif',
  };

  const ulStyles = {
    listStyleType: 'disc',
    fontFamily: 'Arial, sans-serif',
  };

  const pStyles = {
    fontFamily: 'Arial, sans-serif',
  };

  const imgStyles = {
    paddingTop: '20px',
    width: '200px',
    height: '200px',
  };

  const flagIconStyles = {
    paddingLeft: '8px',
  };

  return (
    <div style={container}>
      <div style={flexContainer}>
        <h2>{country.countryApiData.name.common}</h2>
        <span style={flagIconStyles}>{country.countryApiData.flag}</span>
      </div>
      <p style={pStyles}>{capitalMessage}</p>
      <p style={pStyles}>
        Its area is {country.countryApiData.area} square kilometers.{' '}
      </p>
      <div>
        <p style={languagesStyles}>Languages spoken: </p>
        <ul style={ulStyles}>
          {languages.map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img
          style={imgStyles}
          src={country.countryApiData.flags.png}
          alt={country.countryApiData.flags.alt}
        />
        <WeatherCard
          countryName={country.countryApiData.name.common}
          capitalName={country.countryApiData.capital}
          capitalWeather={country.capitalWeatherData}
        />
      </div>
    </div>
  );
};

export default Country;
