import PropTypes from "prop-types";
import { Select } from "./reuseable-components/Select";

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  const sortOrderOptions = ["ascending", "descending"];

  return (
    <>
      <div className="flex items-center gap-3 max-[400px]:flex-col max-[400px]:items-start">
        <div>
          <Select
            label="Sort By:"
            name="sortBy"
            id="sortBy"
            options={fields}
            value={value}
            onChange={onChange}
          />
        </div>
        <p>/</p>
        <div>
          <Select
            label="Sort Order:"
            name="sortOrder"
            id="sortOrder"
            value={orderValue}
            onChange={onOrderChange}
            options={sortOrderOptions}
          />
        </div>
      </div>
    </>
  );
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};
