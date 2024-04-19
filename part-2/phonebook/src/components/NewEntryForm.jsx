/* eslint-disable react/prop-types */
const NewEntryForm = ({
  onSubmit,
  onNameChange,
  onNumberChange,
  nameValue,
  numberValue,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={nameValue}
          onChange={onNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">Phone Number: </label>
        <input
          type="text"
          name="number"
          id="number"
          value={numberValue}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add Person</button>
      </div>
    </form>
  );
};

export default NewEntryForm;
