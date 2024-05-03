/* eslint-disable react/prop-types */
const Country = ({ countryData }) => {
  // The Countries API takes a while to respond to a user search--our country state has an initial value of null which won't be updated by the API as quickly as the rest of the app rerenders. That means the null value will be passed to this component, so, in this case, we don't do anything but return null. This component will render with data when the Countries API call resolves.
  if (countryData === null) {
    return null;
  }

  const languages = Object.entries(countryData.languages);

  // Inline styles.
  const container = {
    display: 'inline-block',
    padding: '25px',
    border: 'solid 1px',
    borderRadius: '5px',
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
        <h2>{countryData.name.common}</h2>
        <span style={flagIconStyles}>{countryData.flag}</span>
      </div>
      <p style={pStyles}>Its capital is {countryData.capital}. </p>
      <p style={pStyles}>Its area is {countryData.area} square kilometers. </p>
      <div>
        <p style={languagesStyles}>Languages spoken: </p>
        <ul style={ulStyles}>
          {languages.map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img
          style={imgStyles}
          src={countryData.flags.png}
          alt={countryData.flags.alt}
        />
      </div>
    </div>
  );
};

export default Country;
