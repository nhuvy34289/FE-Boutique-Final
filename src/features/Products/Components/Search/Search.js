import React, { useRef, useState } from "react";

const Search = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const delaySearchTextTimeOut = useRef(null);

  const onChangeText = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (handleSearch) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current);
      }

      delaySearchTextTimeOut.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    }
  };

  return (
    <>
      <div className="col-lg-4">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Enter Search Here!"
          onChange={onChangeText}
          value={search}
        />
      </div>
    </>
  );
};

export default Search;
