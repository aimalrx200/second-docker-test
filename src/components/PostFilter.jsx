import PropTypes from "prop-types";

import { SearchInput } from "./reuseable-components/SearchInput";

export function PostFilter({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <p>Filter by:</p>
      <SearchInput
        className="w-full flex items-center gap-3"
        label={`${field}: `}
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
