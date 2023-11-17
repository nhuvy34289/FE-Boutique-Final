import React from "react";

const CheckBox = ({ handleChange, checked, label }) => {
  const inputRef = React.useRef(null);

  const onChange = () => {
    if (handleChange) {
      handleChange(inputRef.current);
    }
  };
  return (
    <>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          ref={inputRef}
          onChange={onChange}
          checked={checked}
        />
        <span className="custom-checkbox__checkmark">
          <i className="bx bx-check"></i>
        </span>
        {label}
      </label>
    </>
  );
};

export default CheckBox;
