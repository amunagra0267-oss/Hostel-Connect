import React from "react";
import Icon from "../icons/Icon";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full md:w-72">
      <Icon
        name="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
};

export default SearchBar;
