import React, { useState, useRef, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Storyapi from "../../Utils/Storyapi";
const useStyle = makeStyles((theme) => ({
  root: {
    color: "#172b4d",
    padding: theme.spacing(1, 1, 0, 1),
    height: "28px"
  },
  UnEdit: {
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "2px"
    //paddingLeft: theme.spacing(0.4),
    //paddingTop: theme.spacing(0.4),
    //backgroundColor: "red"
  },
  input: {
    outlineStyle: "none",
    width: "100%",
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    border: "2px solid #0079bf",
    borderRadius: "3px",
    resize: "none",
    marginTop: "-2px",
    padding: theme.spacing(0)
  },
  test: {
    paddingRight: theme.spacing(0.5)
    //position: "relative"
  }
}));

export default function Title({ title, listId }) {
  const [Open, setOpen] = useState(false);
  const [NewTitle, setNewTitle] = useState(title);
  const inputRef = useRef();
  const { UpDateTitle } = useContext(Storyapi);
  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleBlur = () => {
    setOpen(false);
    UpDateTitle(NewTitle, listId);
  };
  const handleKeyDown = (e) => {
    return e.keyCode === 13 ? handleBlur() : "";
  };
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    return inputRef.current ? inputRef.current.focus() : "";
  }, [Open]);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {Open ? (
        <div className={classes.test}>
          <input ref={inputRef} onKeyDown={handleKeyDown} onBlur={handleBlur} className={classes.input} value={NewTitle} onChange={handleChange} />
        </div>
      ) : (
        <div onClick={handleClick} className={classes.UnEdit}>
          {NewTitle}
        </div>
      )}
    </div>
  );
}
