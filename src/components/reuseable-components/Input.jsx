import PropTypes from "prop-types";

export function Input({
  className = "w-full flex flex-col gap-3",
  label = "",
  type = "text",
  name = "",
  id = "",
  value = "",
  onChange = () => {},
  onKeyDown = () => {},
  placeholder = "",
}) {
  return (
    <>
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          className="border border-gray-300 rounded-[6px] px-2 py-1"
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};
