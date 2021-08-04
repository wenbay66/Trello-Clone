import React, { useState, useRef, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AllCardContext } from '../../Container';
import ClearIcon from "@material-ui/icons/Clear";
import { Button, IconButton } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  root_card: {
    //backgroundColor: "pink",
    paddingRight: theme.spacing(1)
  },
  root_list: {
    backgroundColor: "#EBECF0",
    padding: theme.spacing(1)
  },
  textArea: {
    outline: "none",
    resize: "none",
    width: "100%",
    borderRadius: "3px",
    borderTop: "0px",
    borderLeft: "0px",
    borderRight: "0px",
    borderBottom: "0px",
    //borderBottom:"1px solid rgb(23,44,77)",
    padding: theme.spacing(1, 0, 0, 1)
    //padding: theme.spacing(1,1,1,1)
    //padding:theme.spacing(1)
    //backgroundClip:"border-box"
  },
  test: {
    paddingRight: theme.spacing(1)
  },
  btn: {
    backgroundColor: "#5aac44",
    paddingLeft: theme.spacing(1),
    color: "#fff",
    "&:hover": {
      backgroundColor: "#61bd4f"
    }
  }
}));
export default function InputCard(props) {
  const { Open, setOpen, listId, type } = props;
  const [CardTitle, setCardTitle] = useState("");
  const { AddNewCard, AddNewList } = useContext(AllCardContext);
  const inputRef = useRef();
  //輸入文字
  const handleChange = (e) => {
    setCardTitle(e.target.value);
  };
  //關閉卡片輸入欄位
  const handleClose = () => {
    setCardTitle("");
    setOpen(false);
  };
  //新增卡片、看板
  const handleSubmit = () => {
    //新增卡片
    if (type === "Card") AddNewCard(CardTitle, listId);
    //新增看板
    if (type === "List") AddNewList(CardTitle);
    //關閉
    handleClose();
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [Open]);

  const classes = useStyle();
  const root = type === "Card" ? classes.root_card : classes.root_list;
  const test = type === "List" ? classes.test : "";
  const placeholder = type === "Card" ? "為這張卡片輸入標題..." : "為列表輸入標題...";
  return (
    <div className={root}>
      <div className={test}>
        <textarea ref={inputRef} rows="3" className={classes.textArea} placeholder={placeholder} value={CardTitle} onChange={handleChange} />
      </div>
      <div>
        <Button onClick={handleSubmit} className={classes.btn}>
          新增卡片
        </Button>
        <IconButton onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
