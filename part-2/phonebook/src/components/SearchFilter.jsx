/* eslint-disable react/prop-types */
const SearchFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="search">Search for a Person: </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search... "
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchFilter;
