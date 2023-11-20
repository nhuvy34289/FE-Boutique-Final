import React from "react";

const CheckoutInput = ({
  value,
  handleInputChange,
  name,
  placeholder,
  type,
}) => {
  return (
    <div className="col-lg-12 form-group">
      <label className="text-small text-uppercase" htmlFor={name}>
        {name}:
      </label>
      <input
        className="form-control form-control-lg"
        name={name}
        value={value}
        onChange={handleInputChange}
        type={type ? type : "text"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CheckoutInput;
