import ClickAwayListener from "@mui/core/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grow,
  IconButton,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../../assets/loading.gif";
import {
  getProducts,
  getProductsByCategory,
} from "../../../Products/productSlice";
import "./style.css";
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

const SearchProduct = ({ load, categories }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [searchTerm, setsearchTerm] = useState("");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const getProductByCategory = (category) => {
    if (category === "All") {
      dispatch(getProducts());
    } else {
      const query = { category, search: "" };
      dispatch(getProductsByCategory(query));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { category: "", search: searchTerm };
    dispatch(getProductsByCategory(query));
  };

  return (
    <>
      {!load ? (
        <img src={Loading} alt="Loading" className="search-loading" />
      ) : (
        <>
          <Paper
            component="form"
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <IconButton
              className={classes.iconButton}
              aria-label="menu"
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>

            <InputBase
              className={classes.input}
              placeholder="Enter your product..."
              inputProps={{ "aria-label": "Enter your product..." }}
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />

            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              className="popup_Search"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={() => getProductByCategory("All")}>
                          All
                        </MenuItem>
                        {categories.map((category, index) => (
                          <MenuItem
                            key={index}
                            onClick={() =>
                              getProductByCategory(category.content)
                            }
                          >
                            {category.content}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Paper>
        </>
      )}
    </>
  );
};

export default SearchProduct;
