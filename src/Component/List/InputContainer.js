import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import InputCard from "./InputCard";
const useStyle = makeStyles((theme) => ({
  root_card: {
    padding: theme.spacing(0, 1, 0, 1)
  },
  root_list: {
    padding: theme.spacing(1, 1, 0, 1),
    width: "270px"
  },
  Add_card: {
    display: "flex",
    fontSize: "14px",
    fontWeight: "400",
    color: "#5e6c84",
    padding: theme.spacing(0.5),
    borderRadius: "3px",
    cursor: "pointer",
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;",
    "&:hover": {
      backgroundColor: "#dadbe2",
      color: "#172b4d"
    }
  },
  Add_list: {
    display: "flex",
    fontSize: "14px",
    fontWeight: "400",
    color: "#5e6c84",
    backgroundColor: "#EBECF0",
    padding: theme.spacing(1),
    borderRadius: "3px",
    cursor: "pointer",
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;",
    "&:hover": {
      backgroundColor: "#dadbe2",
      color: "#172b4d"
    }
  }
}));
export default function InputContainer({ listId, type }) {
  //const { listId } = props;
  const [Open, setOpen] = useState(false);
  const classes = useStyle();
  const root = type === "Card" ? classes.root_card : classes.root_list;
  const Add = type === "Card" ? classes.Add_card : classes.Add_list;
  return (
    <div className={root}>
      <Collapse in={Open}>
        <InputCard listId={listId} Open={Open} setOpen={setOpen} type={type} />
      </Collapse>
      <Collapse in={!Open}>
        <div onClick={() => setOpen(true)} className={Add}>
          <AddIcon />
          {type === "Card" ? "新增另一張卡片" : "新增其他列表"}
        </div>
      </Collapse>
    </div>
  );
}
