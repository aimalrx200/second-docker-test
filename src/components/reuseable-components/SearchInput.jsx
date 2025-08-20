import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDebounce } from "../../utility/useDebounce";

export function SearchInput({
  className = "w-full flex flex-col gap-3",
  label = "",
  type = "text",
  name = "",
  id = "",
  value = "",
  onChange = () => {},
}) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  return (
    <>
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          className="border border-gray-300 rounded-[6px] px-2 py-1"
          type={type}
          name={name}
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </>
  );
}

SearchInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
