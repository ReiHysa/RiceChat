const FormInput = ({ name, type, placeholder, data, handleFormChange }) => {
  return (
    <div className="field">
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={data[name]}
        onChange={handleFormChange}
        className="message-submit"
      />
    </div>
  );
};

export default FormInput;
