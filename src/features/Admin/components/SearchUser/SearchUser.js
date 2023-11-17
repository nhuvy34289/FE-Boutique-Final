import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { queryFormat } from "../../../../utils/common";
import { searchUsersAction } from "../../adminSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: "10px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchUser = ({ setDone }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = queryFormat({ username: inputValue });
    dispatch(searchUsersAction({ query }));
    setInputValue("");
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        ></IconButton>
        <InputBase
          className={classes.input}
          placeholder="Tìm kiếm người dùng"
          inputProps={{ "aria-label": "Tìm kiếm người dùng" }}
          onChange={(e) => setInputValue(e.target.value)}
          name="inputValue"
          value={inputValue}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default SearchUser;
