/* eslint-disable react/prop-types */
import CountryCard from './CountryCard';

const ClickableCountry = ({ country, onClick }) => {
  // Inline styles.
  const flexContainer = {
    display: 'flex',
    padding: '10px',
  };

  const flexButtonStyles = {
    marginLeft: '5px',
  };

  const buttonStyles = {
    marginRight: '5px',
  };

  const liStyles = {
    paddingTop: '15px',
    paddingBottom: '15px',
  };

  return country.isHidden ? (
    <li style={liStyles}>
      <span>{country.name}: </span>
      <button style={buttonStyles} onClick={onClick}>
        Show
      </button>
    </li>
  ) : (
    <div style={flexContainer}>
      <CountryCard country={country} />
      <button style={flexButtonStyles} onClick={onClick}>
        Hide
      </button>
    </div>
  );
};

export default ClickableCountry;
