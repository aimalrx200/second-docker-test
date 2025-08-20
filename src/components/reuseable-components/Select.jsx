import PropTypes from "prop-types";

export function Select({
  label = "",
  options = [],
  name = "",
  id = "",
  value = "",
  onChange = () => {},
}) {
  return (
    <>
      <div className="w-full flex items-center gap-3 max-[600px]:flex-col max-[600px]:items-start">
        <label htmlFor={id}>{label}</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1"
          name={name}
          id={id}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option disabled value="">
            Select an option...
          </option>
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
